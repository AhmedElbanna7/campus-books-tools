const bcryptjs = require('bcryptjs');
const userModel = require('../models/users_schema.js');
const jwt = require('jsonwebtoken');

const LoginUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    userModel.findOne({ email: email }).then((user) => {
        if (!user) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid email or password',
            });
        }

        let hashedPassword = user.password;
        bcryptjs.compare(password, hashedPassword).then((isMatch) => {
            if (!isMatch) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid email or password',
                });
            }

            if (user.isBlocked) {
                return res.status(403).json({
                    status: 403,
                    message: 'Your account has been blocked.',
                });
            }

            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

            res.status(200).json({
                message: 'Login successful',
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isBlocked: user.isBlocked,
                },
            });
        });
    }).catch((e) => {
        console.error('Login error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    });
}
const GetAllUsers = (req, res) => {
    userModel.find().select('-password').then((usersList) => {
        if (usersList.length === 0) {
            res.status(404).json({
                status: 404,
                message: 'no users found',
            });
        } else {
            res.status(200).send(usersList);
        }
    }).catch((e) => {
        res.status(500).json({ status: 500, message: 'internal server error', });
    });
}

const GetUserById = (req, res) => {
    let id = req.params.id;
    userModel.findById(id).select('-password').then((user) => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ status: 404, message: 'user not found', });
        }
    }).catch((e) => {
        res.status(500).json({ status: 500, message: 'internal server error', });
    });
}

const Register = (req, res) => {
    let data = req.body;
    userModel.create(data).then((newUser) => {
        const userResponse = newUser.toObject();
        delete userResponse.password;
        res.status(201).json(userResponse);
    }).catch((e) => {
        res.status(500).json({ status: 500, message: 'internal server error', });
    });
}

const DeleteUser = (req, res) => {
    let id = req.params.id;
    userModel.findByIdAndDelete(id).then((deletedUser) => {
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully', });
        } else {
            res.status(404).json({ status: 404, message: 'User not found', });
        }
    }).catch((e) => {
        res.status(500).json({ status: 500, message: 'internal server error', });
    });
}

const UpdateUser = (req, res) => {
    let id = req.params.id;
    userModel.findByIdAndUpdate(id, req.body, { new: true }).then((updatedUser) => {
        if (!updatedUser) {
            res.status(404).json({ status: 404, message: 'user not found', });
        } else {
            const userResponse = updatedUser.toObject();
            delete userResponse.password;
            res.status(201).json(userResponse);
        }
    }).catch((e) => {
        res.status(500).json({ status: 500, message: 'internal server error', });
    });
}

module.exports = { GetAllUsers, GetUserById, Register, DeleteUser, LoginUser, UpdateUser };