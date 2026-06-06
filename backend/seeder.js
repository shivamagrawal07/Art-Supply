const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Listing = require('./models/Listing');

dotenv.config();

const users = [
  { name: 'Alice Artist', email: 'alice@example.com', password: 'password123', location: 'New York', role: 'user' },
  { name: 'Bob Painter', email: 'bob@example.com', password: 'password123', location: 'Brooklyn', role: 'user' }
];

const listings = [
  { title: 'Winsor & Newton Oil Paints (Set of 10)', description: 'Hardly used, moving to acrylics. Perfect for professional canvas work.', category: 'paint', condition: 'used', price: 45, images: ['https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&h=400&fit=crop'] },
  { title: 'Large Cotton Canvas 36x48', description: 'Brand new in wrapper. Bought wrong size. Gesso primed.', category: 'canvas', condition: 'new', price: 30, images: ['https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?w=600&h=400&fit=crop'] },
  { title: 'Princeton Velvetouch Brush Set', description: 'Great for watercolor and acrylics. Barely used.', category: 'tools', condition: 'used', price: 15, images: ['https://images.unsplash.com/photo-1596461404969-9cea37505e94?w=600&h=400&fit=crop'] },
  { title: 'Heavy Body Golden Acrylics', description: 'Titanium white and Ultramarine blue almost full tubes.', category: 'paint', condition: 'used', price: 22, images: ['https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?w=600&h=400&fit=crop'] }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB...');

    await User.deleteMany();
    await Listing.deleteMany();

    const createdUsers = [];
    for (let u of users) {
      const created = await User.create(u);
      createdUsers.push(created);
    }

    const sampleListings = listings.map((l, index) => {
      return { ...l, seller: createdUsers[index % 2]._id };
    });

    await Listing.insertMany(sampleListings);
    console.log('Data Imported successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
