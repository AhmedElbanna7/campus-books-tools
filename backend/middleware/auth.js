const jwt = require('jsonwebtoken');
const userModel = require('../models/users_schema');

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized.'
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.SECRET_KEY
        );
        const user = await userModel
            .findById(decoded.id)
            .select('-password');
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found',
            });
        }
        if (user.isBlocked) {
            return res.status(403).json({
                status: 403,
                message: 'Your account is blocked',
            });
        }
        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid or expired token',
        });
    }
};

const roleAuth = async (req, res, next) => {
    if (req.user.role != 'admin') {
        return res.status(403).json({
            status: 403,
            message: 'only admins can take this action',
        });
    }
    next();
};

module.exports = { protect, roleAuth };