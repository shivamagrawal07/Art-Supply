const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  requestor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetListing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  offeredListing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: { type: String },
}, { timestamps: true });

const SwapRequest = mongoose.model('SwapRequest', swapRequestSchema);
module.exports = SwapRequest;
