const Listing = require('../models/Listing');

const getListings = async (req, res) => {
  try {
    const { category, condition, search } = req.query;
    let query = { status: 'available' };
    
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const listings = await Listing.find(query).populate('seller', 'name location');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('seller', 'name location');
    if (listing) {
      res.json(listing);
    } else {
      res.status(404).json({ message: 'Listing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createListing = async (req, res) => {
  const { title, description, category, condition, price, images } = req.body;
  try {
    const listing = new Listing({
      title, description, category, condition, price, images, seller: req.user._id
    });
    const createdListing = await listing.save();
    res.status(201).json(createdListing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getListings, getListingById, createListing };
