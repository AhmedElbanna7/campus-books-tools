const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 3,
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    itemType: {
        type: String,
        required: true,
        enum: ['Book','Tool','Device'],
    },
    category: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ['New', 'Like-New', 'Used', 'Worn'],
        default: 'New',
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        required: function () {
            return !this.isFree;
        },
        min: 0,
    },
    images: {
        type: [String],
        required: true,
    },
    operation: {
        type: String,
        enum: ['Sale', 'Borrow', 'Both'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Available', 'Borrowed', 'Sold'],
        default: 'Available',
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
},
    {
        timestamps: true,
    });

const listingModel = mongoose.model('listing', listingSchema);
module.exports = listingModel;