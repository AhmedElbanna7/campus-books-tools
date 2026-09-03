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
        enum: ['book', 'tool'],
    },
    category: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        enum: ['new', 'like-new', 'used', 'worn'],
        default: 'new',
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
    status: {
        type: String,
        enum: ['available', 'borrowed', 'sold'],
        default: 'available',
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