const express = require('express');
const router = express.Router();
const { getListings, getListingById, createListing } = require('../controllers/listingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getListings).post(protect, createListing);
router.route('/:id').get(getListingById);

module.exports = router;
