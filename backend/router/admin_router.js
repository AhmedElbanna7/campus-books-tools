const adminRouter = require('express').Router();
const { protect, roleAuth } = require('../middleware/auth.js');
const { getStats, deleteListings, blockUser, unblockUser } = require('../controller/admin_controller.js');

adminRouter.get('/getstats', protect, roleAuth, getStats);
adminRouter.delete('/deletelisting/:id', protect, roleAuth, deleteListings);
adminRouter.put('/block/:id', protect, roleAuth, blockUser);
adminRouter.put('/unblock/:id', protect, roleAuth, unblockUser);

module.exports = adminRouter;