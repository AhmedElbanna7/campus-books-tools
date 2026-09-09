const listingsRouter = require('express').Router();
const { searchListings } = require('../controller/listing_controller.js');

listingsRouter.get('/search', searchListings);

module.exports = listingsRouter;