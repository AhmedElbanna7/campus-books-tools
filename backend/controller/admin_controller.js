const userModel = require('../models/users_schema.js');
const listingModel = require('../models/listing_schema.js');
const favoriteModel = require('../models/favourite_schema.js');
const cloudinary = require('../config/cloudinary');
const extractCloudinaryPublicId = require('../utils/extractCloudinaryPublicId.js');

// get stats
const GetStats = async (req, res) => {
    try {
        const usersCount = await userModel.countDocuments();
        const blockedUsersCount = await userModel.countDocuments({ isBlocked: true });

        const listingsCount = await listingModel.countDocuments();
        const availableListingsCount = await listingModel.countDocuments({ status: 'Available' });
        const borrowedListingsCount = await listingModel.countDocuments({ status: 'Borrowed' });
        const soldListingsCount = await listingModel.countDocuments({ status: 'Sold' });

        return res.status(200).json({
            Users: usersCount,
            Blocked: blockedUsersCount,
            Listings: listingsCount,
            Available: availableListingsCount,
            Borrowed: borrowedListingsCount,
            Sold: soldListingsCount
        });
    } catch (e) {
        console.error('Get stats error:', e);
        return res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// get users
const GetAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.status(200).json(users);
    } catch (e) {
        console.error('Get all users error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// get listings
const GetAllListings = async (req, res) => {
    try {
        const listings = await listingModel.find().populate('owner', 'name email');
        res.status(200).json(listings);
    } catch (e) {
        console.error('Get all listings error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// delete listings/:id
const DeleteListings = async (req, res) => {
    try {
        const id = req.params.id;
        const listing = await listingModel.findById(id);

        if (!listing) {
            return res.status(404).json({ status: 404, message: 'Listing not found' });
        }

        // Clean up Cloudinary images before removing the document
        for (const url of listing.images) {
            const publicId = extractCloudinaryPublicId(url);
            if (!publicId) continue;

            try {
                await cloudinary.uploader.destroy(publicId);
            } catch (cloudErr) {
                console.error(`Failed to delete Cloudinary image ${publicId}:`, cloudErr);
            }
        }

        // Remove any favorites pointing at this listing
        await favoriteModel.deleteMany({ listing: id });

        await listing.deleteOne();

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (e) {
        console.error('Delete listing error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// block
const BlockUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ status: 404, message: 'user not found' });
        }
        res.status(200).json({ message: 'user blocked.', user });
    } catch (e) {
        console.error('Block user error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// unblock
const UnblockUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ status: 404, message: 'user not found' });
        }
        res.status(200).json({ message: 'user unblocked.', user });
    } catch (e) {
        console.error('Unblock user error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// edit User and Admin
const ToggleUserRole = async (req, res) => {
    try {
        const id = req.params.id;

        // Prevent an admin from demoting themself and losing dashboard access
        if (id === req.user._id.toString()) {
            return res.status(400).json({ status: 400, message: "You can't change your own role" });
        }

        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'user not found' });
        }

        user.role = user.role === 'admin' ? 'user' : 'admin';
        await user.save();

        res.status(200).json({ message: `user role changed to ${user.role}`, role: user.role });
    } catch (e) {
        console.error('Toggle role error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

// DELETE user by id
const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        if (id === req.user._id.toString()) {
            return res.status(400).json({ status: 400, message: "You can't delete your own account" });
        }

        const listings = await listingModel.find({ owner: id });
        const listingIds = listings.map((item) => item._id);

        for (const item of listings) {
            for (const url of item.images) {
                const publicId = extractCloudinaryPublicId(url);
                if (!publicId) continue;

                try {
                    await cloudinary.uploader.destroy(publicId);
                } catch (cloudErr) {
                    console.error(`Failed to delete Cloudinary image ${publicId}:`, cloudErr);
                }
            }
        }

        await listingModel.deleteMany({ owner: id });
        await favoriteModel.deleteMany({
            $or: [
                { user: id },
                { listing: { $in: listingIds } }
            ]
        });

        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'user not found' });
        }

        res.status(200).json({ message: 'user deleted.' });
    } catch (e) {
        console.error('Delete user error:', e);
        res.status(500).json({ status: 500, message: 'internal server error' });
    }
};

module.exports = {
    GetStats,
    GetAllUsers,
    GetAllListings,
    DeleteListings,
    BlockUser,
    UnblockUser,
    ToggleUserRole,
    DeleteUser
};
