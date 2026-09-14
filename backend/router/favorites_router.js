const favoritesRouter = require('express').Router();
const { protect, roleAuth } = require('../middleware/auth.js');
const {addFavorite,deleteFavorite,getFavorites} = require('../controller/favorite_controller.js');

favoritesRouter.get('/favorites', protect, getFavorites);
favoritesRouter.post('/addfavorites/:listing_Id', protect, addFavorite);
favoritesRouter.delete('/deletefavorites/:listing_Id', protect, deleteFavorite);
module.exports = favoritesRouter;