const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listing',
        required: true,
    },
},
    {
        timestamps: {
            createdAt: true,
            updatedAt: false,
        }
    });

// Prevent duplicate favourites
favouriteSchema.index(
    { user: 1, listing: 1 },
    { unique: true }
);

const favouriteModel = mongoose.model('favourite', favouriteSchema);
module.exports = favouriteModel;