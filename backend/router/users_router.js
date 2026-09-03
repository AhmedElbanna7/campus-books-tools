const userRouter = require('express').Router();
const { GetAllUsers, GetUserById, Register, DeleteUser, LoginUser, UpdateUser } = require('../controller/users_controller.js');
const protect = require('../middleware/auth.js');

userRouter.post('/login', LoginUser);
userRouter.get('/users', protect, GetAllUsers);
userRouter.get('/users/:id', protect, GetUserById);
userRouter.post('/register', Register);
userRouter.delete('/deleteUser/:id', protect, DeleteUser);
userRouter.put('/updateUser/:id', protect, UpdateUser);

module.exports = userRouter;