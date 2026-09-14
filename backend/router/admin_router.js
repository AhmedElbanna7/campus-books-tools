const userRouter = require('express').Router();
const { protect,roleAuth } = require('../middleware/auth.js');
const {GetStats,GetAllUsers,GetAllListings,DeleteListings,BlockUser,UnblockUser,ToggleUserRole,DeleteUser} = require('../controller/admin_controller.js');

userRouter.get('/stats', protect, roleAuth, GetStats);
userRouter.get('/users', protect, roleAuth, GetAllUsers);
userRouter.get('/listings', protect, roleAuth, GetAllListings);
userRouter.patch('/users/:id/block', protect, roleAuth, BlockUser);
userRouter.patch('/users/:id/unblock', protect, roleAuth, UnblockUser);
userRouter.patch('/userrole/:id', protect, roleAuth, ToggleUserRole);
userRouter.delete('/users/:id', protect, roleAuth, DeleteUser);
userRouter.delete('/listings/:id', protect, roleAuth, DeleteListings);

module.exports = userRouter;
