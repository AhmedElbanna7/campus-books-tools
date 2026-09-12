const mongoose = require("mongoose");
const listModel = require('../models/listing_schema.js');
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const _ = require('lodash'); // To prevent regex injection

// search
const searchListings = async (req, res) => {
  try {
    const { name, itemType, category, operation } = req.query;
    const conditions = [];

    // name
    if (name && name.trim().length > 0) {
      const safeName = _.escapeRegExp(name.trim());
      conditions.push({ title: { $regex: safeName, $options: 'i' } });
    }

    // itemType or type
    if (itemType && itemType.trim().length > 0) {
      conditions.push({ itemType: itemType.trim() }); 
    }

    // category
    if (category && category.trim().length > 0) {
      conditions.push({ category: category.trim() }); 
    }

    // operation
    if (operation && operation.trim().length > 0) {
      conditions.push({ operation: operation.trim() }); 
    }

    // Only return listings that are available
    conditions.push({ status: "Available" });
  
    const filter = conditions.length > 0 ? { $and: conditions } : {};
    const listings = await listModel.find(filter);
    res.json(listings);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error while searching listings' });
  }
};

const itemTypes = ["Book", "Tool", "Device"];
const conditions = ['New', 'Like-New', 'Used', 'Worn'];
const statuses = ["Available", "Borrowed", "Sold"];
const operations = ["Sale", "Borrow", "Both"];

function validateCreate(body) {
  const targetType = body.itemType || body.type;

  if (!body.title || !body.description || !targetType ||
      !body.category || !body.condition || !body.operation) {
    return "title, description, Type, category, condition and operation are required";
  }
  if (!itemTypes.includes(targetType)) return "Type must be Book, Tool or Device";
  if (!operations.includes(body.operation)) return "Operation must be Sale, Borrow or Both";
  if (!conditions.includes(body.condition)) {
    return "condition must be New, Like-New, Used or Worn";
  }
  return null;
}

// POST /listings
const createListing = async (req, res, next) => {
  try {
    const error = validateCreate(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    const isFree = String(req.body.isFree).toLowerCase() === "true";
    const price = isFree ? 0 : Number(req.body.price);

    if (!isFree && (!Number.isFinite(price) || price < 0)) {
      return res.status(400).json({
        success: false,
        message: "price must be a valid number >= 0"
      });
    }

    const images = [];
    for (const file of (req.files || [])) {
      images.push(await uploadToCloudinary(file.buffer));
    }

    const itemType = req.body.itemType || req.body.type;

    const listing = await listModel.create({
      owner: req.user._id,
      title: req.body.title,
      description: req.body.description,
      itemType,
      category: req.body.category,
      operation: req.body.operation,
      images,
      price,
      isFree,
      condition: req.body.condition,
      status: "Available"
    });

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing
    });
  } catch (err) {
    next(err);
  }
};

// PUT /listings/:id
const updateListing = async (req, res, next) => {
  try {
    const listing = await listModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    const isOwner = listing.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "Admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own listings"
      });
    }

    const newType = req.body.itemType || req.body.type;
    if (newType && !itemTypes.includes(newType)) { // Fixed types -> itemTypes reference
      return res.status(400).json({ success: false, message: "Invalid itemType (must be Book or Tool)" });
    }
    if (req.body.condition && !conditions.includes(req.body.condition)) {
      return res.status(400).json({ success: false, message: "Invalid condition" });
    }
    if (req.body.status && !statuses.includes(req.body.status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    if (req.body.operation && !operations.includes(req.body.operation)) {
      return res.status(400).json({ success: false, message: "Invalid operation" });
    }

    const fields = ["title", "description", "category", "condition", "status", "operation"];
    for (const field of fields) {
      if (req.body[field] !== undefined) listing[field] = req.body[field];
    }

    if (newType) listing.itemType = newType;

    if (req.body.isFree !== undefined) {
      listing.isFree = String(req.body.isFree).toLowerCase() === "true";
    }

    if (listing.isFree) {
      listing.price = 0;
    } else if (req.body.price !== undefined) {
      const price = Number(req.body.price);
      if (!Number.isFinite(price) || price < 0) {
        return res.status(400).json({
          success: false,
          message: "price must be a valid number >= 0"
        });
      }
      listing.price = price;
    }

    for (const file of (req.files || [])) {
      listing.images.push(await uploadToCloudinary(file.buffer));
    }

    await listing.save();

    res.json({
      success: true,
      message: "Listing updated successfully",
      listing
    });
  } catch (err) {
    next(err);
  }
};

// DELETE /listings/:id
const deleteListing = async (req, res, next) => {
  try {
    const listing = await listModel.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ success: false, message: "Listing not found" });
    }

    const isOwner = listing.owner.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "Admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own listings"
      });
    }

    await listing.deleteOne();

    res.json({
      success: true,
      message: "Listing deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};

// GET /listingDetails/:id
const getListingDetails = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID"
      });
    }

    const listing = await listModel.findById(req.params.id)
      .populate("owner", "name email");

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found"
      });
    }

    res.json({
      success: true,
      listing
    });
  } catch (err) {
    next(err);
  }
};

// GET /listings/:id/contact
const getOwnerContact = async (req, res) => {
  try {
    const listing = await listModel.findById(req.params.id).populate('owner', 'name email phone');

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json({
      name: listing.owner.name,
      email: listing.owner.email,
      phone: listing.owner.phone,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching contact info' });
  }
};

//get My listing 
const getMyListings = async (req, res) => {
  try {
    const { ownerId, status} = req.query;
    const conditions = [];

    const filter = { owner: req.user._id };
    if (req.query.status){
      filter.status = req.query.status;
    } 

    const listings = await listModel.find(filter);
    res.json(listings);

  } catch (error) {
    console.error('Failed to fetch owner listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  searchListings,
  validateCreate,
  createListing,
  updateListing,
  deleteListing,
  getListingDetails,
  getOwnerContact,
  getMyListings
};