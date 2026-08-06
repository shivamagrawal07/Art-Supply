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
  // Paints
  { title: 'Winsor & Newton Oil Paints (Set of 10)', description: 'Hardly used, moving to acrylics. Perfect for professional canvas work.', category: 'Paints', condition: 'used', price: 45, images: ['/holbein_gouache_1786024795719.png'] },
  { title: 'Heavy Body Golden Acrylics', description: 'Titanium white and Ultramarine blue almost full tubes.', category: 'Paints', condition: 'used', price: 22, images: ['/acrylic_paint_1786024807375.png'] },
  { title: 'Holbein Gouache Set 24 Colors', description: 'Vibrant gouache set. Only opened once to swatch colors.', category: 'Paints', condition: 'new', price: 60, images: ['/watercolor_set_1786024818091.png'] },
  { title: 'Schmincke Horadam Watercolor Pan', description: 'Half pan set. Lightly used, plenty of pigment left.', category: 'Paints', condition: 'used', price: 85, images: ['https://images.unsplash.com/photo-1514197992770-4db0b8474d2b?w=600&h=400&fit=crop'] },
  { title: 'Liquitex Basics Acrylic Paint Set', description: 'Great for beginners. 36 colors, completely sealed.', category: 'Paints', condition: 'new', price: 35, images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop'] },

  // Brushes
  { title: 'Princeton Velvetouch Brush Set', description: 'Great for watercolor and acrylics. Barely used.', category: 'Brushes', condition: 'used', price: 15, images: ['https://images.unsplash.com/photo-1596461404969-9cea37505e94?w=600&h=400&fit=crop'] },
  { title: 'Da Vinci Maestro Kolinsky Round 6', description: 'Premium watercolor brush. Snaps to a perfect point.', category: 'Brushes', condition: 'used', price: 25, images: ['https://images.unsplash.com/photo-1576402830866-9b57700e57f5?w=600&h=400&fit=crop'] },
  { title: 'Assorted Hog Bristle Brushes', description: 'Bundle of 10 flat and filbert brushes for oil painting.', category: 'Brushes', condition: 'used', price: 18, images: ['https://images.unsplash.com/photo-1499892477393-f6758024acb7?w=600&h=400&fit=crop'] },
  { title: 'Rosemary & Co Travel Brush Set', description: 'Pocket sized brushes ideal for plein air painting.', category: 'Brushes', condition: 'new', price: 50, images: ['https://images.unsplash.com/photo-1472506692994-3a9d98f8ccdf?w=600&h=400&fit=crop'] },
  { title: 'Detailing Brushes 000-1', description: 'Micro brushes for miniature painting or fine details.', category: 'Brushes', condition: 'new', price: 12, images: ['https://images.unsplash.com/photo-1583225214464-9296029427aa?w=600&h=400&fit=crop'] },

  // Canvas
  { title: 'Large Cotton Canvas 36x48', description: 'Brand new in wrapper. Bought wrong size. Gesso primed.', category: 'Canvas', condition: 'new', price: 30, images: ['https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?w=600&h=400&fit=crop'] },
  { title: 'Linen Canvas Panels 8x10', description: 'Archival quality linen boards. Great for oil sketches. Pack of 5.', category: 'Canvas', condition: 'new', price: 22, images: ['https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=600&h=400&fit=crop'] },
  { title: 'Stretched Canvas 16x20', description: 'Standard profile stretched canvas. Pack of 2.', category: 'Canvas', condition: 'new', price: 15, images: ['https://images.unsplash.com/photo-1523126744211-13c54fb917b2?w=600&h=400&fit=crop'] },
  { title: 'Canvas Roll 10 Yards Unprimed', description: 'Heavyweight cotton duck canvas roll for custom sizes.', category: 'Canvas', condition: 'used', price: 40, images: ['https://images.unsplash.com/photo-1579762593175-20226054cad0?w=600&h=400&fit=crop'] },
  { title: 'Mini Canvas Set 4x4', description: 'Perfect for tiny acrylic paintings or gifts. Pack of 10.', category: 'Canvas', condition: 'new', price: 10, images: ['https://images.unsplash.com/photo-1618142784523-28956920f188?w=600&h=400&fit=crop'] },

  // Sketchbooks
  { title: 'Moleskine Art Sketchbook Large', description: 'Classic Moleskine sketchbook, 5 x 8.25 inches. Unused.', category: 'Sketchbooks', condition: 'new', price: 18, images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=400&fit=crop'] },
  { title: 'Arches Watercolor Block 9x12', description: '100% cotton, 140lb cold press. 18 sheets remaining.', category: 'Sketchbooks', condition: 'used', price: 25, images: ['https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=600&h=400&fit=crop'] },
  { title: 'Strathmore Toned Tan Sketchpad', description: 'Great for charcoal and white gel pen highlights.', category: 'Sketchbooks', condition: 'new', price: 10, images: ['https://images.unsplash.com/photo-1459908676289-2cca4f3f4e13?w=600&h=400&fit=crop'] },
  { title: 'Leuchtturm1917 Sketchbook A5', description: 'High quality paper suitable for ink and pencil. Black cover.', category: 'Sketchbooks', condition: 'used', price: 15, images: ['https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=600&h=400&fit=crop'] },

  // Markers
  { title: 'Copic Sketch Markers Basic 36', description: 'Professional quality alcohol markers. Used for one project.', category: 'Markers', condition: 'used', price: 80, images: ['https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop'] },
  { title: 'Micron Fineliner Pen Set', description: 'Sizes 005 to 08. Perfect for inking and illustration.', category: 'Markers', condition: 'new', price: 14, images: ['https://images.unsplash.com/photo-1523315801552-875f560e9db3?w=600&h=400&fit=crop'] },
  { title: 'Tombow Dual Brush Pen Art Markers', description: 'Bright palette set of 10. Water-based ink.', category: 'Markers', condition: 'new', price: 16, images: ['https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&h=400&fit=crop'] }
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
