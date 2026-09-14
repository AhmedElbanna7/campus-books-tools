const userRouter = require('express').Router();
const { protect, roleAuth } = require('../middleware/auth.js');
const { GetAllUsers, GetUserById, Register, DeleteUser, LoginUser,} = require('../controller/users_controller.js');

userRouter.post('/login', LoginUser);
userRouter.get('/users', protect, roleAuth, GetAllUsers);
userRouter.get('/users/:id', protect, GetUserById);
userRouter.post('/register', Register);
userRouter.delete('/deleteUser/:id', protect, roleAuth, DeleteUser);
userRouter.get('/me', protect, (req, res) => {res.json(req.user);});
module.exports = userRouter;
