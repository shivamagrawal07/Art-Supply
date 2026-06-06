const express = require('express');
const router = express.Router();
const { createSwapRequest, getMySwapRequests, updateSwapStatus } = require('../controllers/swapController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createSwapRequest).get(protect, getMySwapRequests);
router.route('/:id').put(protect, updateSwapStatus);

module.exports = router;
