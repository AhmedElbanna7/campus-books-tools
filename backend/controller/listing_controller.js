const listModel = require('../models/listing_schema.js');
const _ = require('lodash'); //علشان نتجنب regex injectionال 

const searchListings = async (req, res) => {
  try {
    const { name, type, category } = req.query;

    const conditions = [];// array لكل شروط البحث

    // name
    if (name && name.trim().length > 0) {
      const safeName = _.escapeRegExp(name.trim());
      conditions.push({ title: { $regex: safeName, $options: 'i' } });
    }

    // type
    if (type && type.trim().length > 0) {
      conditions.push({ itemType: type.trim() }); 
    }

    // category
    if (category && category.trim().length > 0) {
      conditions.push({ category: category.trim() }); 
    }

    const filter = conditions.length > 0 ? { $and: conditions } : {};

    const listings = await listModel.find(filter);

    res.json(listings);
    
  } catch (error) {
    res.status(500).json({ message: 'Server error while searching listings' });
  }
};

module.exports = {
  searchListings
};