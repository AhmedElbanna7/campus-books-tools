const userRouter = require('express').Router();
const { GetAllUsers, GetUserById, Register, DeleteUser, LoginUser, UpdateUser } = require('../controller/users_controller.js');
const { protect, roleAuth } = require('../middleware/auth.js');

userRouter.post('/login', LoginUser);
userRouter.get('/users', protect, roleAuth, GetAllUsers);
userRouter.get('/users/:id', protect, GetUserById);
userRouter.post('/register', Register);
userRouter.delete('/deleteUser/:id', protect, roleAuth, DeleteUser);
userRouter.put('/updateUser/:id', protect, UpdateUser);
userRouter.get('/me', protect, (req, res) => {res.json(req.user);});
module.exports = userRouter;