const SwapRequest = require('../models/SwapRequest');
const Listing = require('../models/Listing');

const createSwapRequest = async (req, res) => {
  const { targetListingId, offeredListingId, message } = req.body;
  try {
    const targetListing = await Listing.findById(targetListingId);
    if (!targetListing) return res.status(404).json({ message: 'Target listing not found' });

    const swapRequest = new SwapRequest({
      requestor: req.user._id,
      receiver: targetListing.seller,
      targetListing: targetListingId,
      offeredListing: offeredListingId,
      message
    });

    const createdSwap = await swapRequest.save();
    res.status(201).json(createdSwap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMySwapRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({
      $or: [{ requestor: req.user._id }, { receiver: req.user._id }]
    })
    .populate('targetListing')
    .populate('offeredListing')
    .populate('requestor', 'name')
    .populate('receiver', 'name');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSwapStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await SwapRequest.findById(req.params.id);
    
    if (!request) return res.status(404).json({ message: 'Swap request not found' });
    
    if (request.receiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this request' });
    }

    request.status = status;
    await request.save();
    
    if (status === 'accepted') {
      await Listing.findByIdAndUpdate(request.targetListing, { status: 'swapped' });
      await Listing.findByIdAndUpdate(request.offeredListing, { status: 'swapped' });
    }
    
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSwapRequest, getMySwapRequests, updateSwapStatus };
