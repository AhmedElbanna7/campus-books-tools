const listingsRouter = require('express').Router();
const { protect, roleAuth } = require('../middleware/auth.js');
const { searchListings,createListing,updateListing,deleteListing,getListingDetails,getOwnerContact,getMyListings,getlistingbyId } = require('../controller/listing_controller.js');
const upload = require('../middleware/upload.js');

listingsRouter.get('/search', searchListings);
listingsRouter.post('/listings', protect,upload.array('images', 5), createListing);
listingsRouter.put('/updatelistings/:id', protect,upload.array('images', 5), updateListing);
listingsRouter.delete('/deletelistings/:id', protect, deleteListing);
listingsRouter.get('/listings/:id', getlistingbyId);
listingsRouter.get('/listingDetails/:id', getListingDetails);
listingsRouter.get('/listingsDetails/:id/contact', protect, getOwnerContact);
listingsRouter.get('/listingsByOwner', protect, getMyListings);
module.exports = listingsRouter;