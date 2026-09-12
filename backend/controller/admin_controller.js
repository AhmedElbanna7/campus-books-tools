const userModel = require('../models/users_schema.js');
const listingModel = require('../models/listing_schema.js');

const getStats = async (req, res) => {
    try {
        let usersCount = await userModel.countDocuments();
        let blockedUsersCount = await userModel.countDocuments({ isBlocked: true });

        let listingsCount = await listingModel.countDocuments();
        let availableListingsCount = await listingModel.countDocuments({ status: 'available' });
        let borrowedListingsCount = await listingModel.countDocuments({ status: 'borrowed' });
        let soldListingsCount = await listingModel.countDocuments({ status: 'sold' });

        return res.status(200).json({
            Users: usersCount,
            Blocked: blockedUsersCount,
            Listings: listingsCount,
            Available: availableListingsCount,
            Borrowed: borrowedListingsCount,
            Sold: soldListingsCount
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: 'internal server error', });
    }
}

const deleteListings = (req, res) => {
    let id = req.params.id;

    listingModel.findByIdAndDelete(id).then((listing) => {
        if (!listing) {
            res.status(404).json({ status: 404, message: 'Listing not found' });
        } else {
            res.status(200).json({ message: 'Listing deleted successfully' });
        }
    }).catch((e) => { res.status(500).json({ status: 500, message: 'internal server error', }); });
}

const blockUser = (req, res) => {
    let id = req.params.id;

    userModel.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).then((user) => {
        if (!user) {
            res.status(404).json({ status: 404, message: 'user not found' });
        } else {
            res.status(200).json({ message: 'user blocked.' });
        }
    }).catch((e) => { res.status(500).json({ status: 500, message: 'internal server error', }); });
}

const unblockUser = (req, res) => {
    let id = req.params.id;

    userModel.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).then((user) => {
        if (!user) {
            res.status(404).json({ status: 404, message: 'user not found' });
        } else {
            res.status(200).json({ message: 'user unblocked.' });
        }
    }).catch((e) => { res.status(500).json({ status: 500, message: 'internal server error', }); });
}

module.exports = { getStats, deleteListings, blockUser, unblockUser };
