const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('./models/Listing');

dotenv.config();

const updateImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const result = await Listing.updateOne(
      { title: { $regex: 'Princeton Velvetouch', $options: 'i' } },
      { $set: { images: ['/images/princeton_brushes.png'] } }
    );
    
    console.log(`Updated ${result.modifiedCount} listing(s).`);

    process.exit();
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
};

updateImage();
