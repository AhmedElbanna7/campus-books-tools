const listingsRouter = require('express').Router();
const { protect, roleAuth } = require('../middleware/auth.js');
const { searchListings,createListing,updateListing,deleteListing,getListingDetails,getOwnerContact,getMyListings } = require('../controller/listing_controller.js');

listingsRouter.get('/search', searchListings);
listingsRouter.post('/listings', protect, createListing);
listingsRouter.put('/updatelistings/:id', protect, updateListing);
listingsRouter.delete('/deletelistings/:id', protect, deleteListing);
listingsRouter.get('/listingDetails/:id', getListingDetails);
listingsRouter.get('/listingsDetails/:id/contact', protect, getOwnerContact);
listingsRouter.get('/listingsByOwner', protect, getMyListings);
module.exports = listingsRouter;