const mongoose = require("mongoose");
const favoriteModel = require('../models/favourite_schema.js');
const { protect } = require('../middleware/auth.js');

const addFavorite = async (req, res) => {
    try {
        const { listing_Id } = req.params;
        const userId = req.user._id;
        const favorite = await favoriteModel.create({
            user: userId,
            listing: listing_Id
        });
        res.status(201).json({
            success: true,
            message: "Favorite added successfully",
            favorite
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error adding favorite"
        });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { listing_Id } = req.params;
        const userId = req.user._id;
        const favorite = await favoriteModel.findOneAndDelete({
            user: userId,
            listing: listing_Id
        });
        res.status(200).json({
            success: true,
            message: "Favorite deleted successfully",
            favorite
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error deleting favorite"
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const userId = req.user._id;
        const category = req.query.category;

        const favorites = await favoriteModel.find({ user: userId }).populate('listing');

        let listings = favorites.map((f) => f.listing);

        if (category) {
            listings = listings.filter((item) => item.category === category);
        }

        res.json(listings);

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching favorites"
        });
    }
}
module.exports = {
    addFavorite,
    deleteFavorite,
    getFavorites
};