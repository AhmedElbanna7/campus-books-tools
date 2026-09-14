const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,

        validate: {
            validator: function (value) { return validator.isEmail(value) },
            message: `email is not valid`
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    faculty: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^(01)[0-2,5]{1}[0-9]{8}$/,
    },
    avatar: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;