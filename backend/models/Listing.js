const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['new', 'used'], required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['available', 'sold', 'swapped'], default: 'available' },
}, { timestamps: true });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
