const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Listing = require('./models/Listing');
const User = require('./models/User');

dotenv.config();

const sampleListings = [
  {
    title: 'Prismacolor Premier Colored Pencils (72 Set)',
    description: 'Barely used set of Prismacolor Premier pencils. Missing one white pencil, but otherwise in perfect condition. Great for blending and shading.',
    category: 'Pens/Markers',
    condition: 'used',
    price: 35,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Copic Sketch Markers Basic 36 Color Set',
    description: 'Professional quality Copic markers. Used for one semester in design school. Most still have plenty of ink. Selling because I switched to digital.',
    category: 'Pens/Markers',
    condition: 'used',
    price: 80,
    images: ['https://images.unsplash.com/photo-1583225214464-9296029427aa?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Strathmore 400 Series Watercolor Pad 9x12',
    description: 'Brand new, unopened watercolor pad. 140lb cold press paper, 12 sheets. Bought an extra one by mistake.',
    category: 'Sketchbooks',
    condition: 'new',
    price: 12,
    images: ['https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Winsor & Newton Professional Watercolors (Tubes)',
    description: 'Set of 12 tubes. Used the Ultramarine and Alizarin Crimson a bit, others are practically full. Highly pigmented.',
    category: 'Paints',
    condition: 'used',
    price: 45,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Heavy Duty Wooden Table Easel',
    description: 'Sturdy tabletop H-frame easel. Can accommodate canvases up to 24 inches high. Folds flat for storage.',
    category: 'Tools',
    condition: 'used',
    price: 25,
    images: ['https://images.unsplash.com/photo-1579762593175-20226054cad0?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Golden Heavy Body Acrylic Paints (Set of 6)',
    description: 'Premium acrylic paints. The titanium white is half empty, but the others are mostly full. Great consistency.',
    category: 'Paints',
    condition: 'used',
    price: 30,
    images: ['https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Moleskine Art Sketchbook Large',
    description: 'Classic Moleskine sketchbook, 5 x 8.25 inches. Unused and still in plastic wrap. 165 g/m² paper.',
    category: 'Sketchbooks',
    condition: 'new',
    price: 18,
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Sculpey Premo Polymer Clay Bundle',
    description: '6 blocks of 2oz Sculpey Premo in various colors. One block was opened but barely used. Always stored in airtight container.',
    category: 'Clay',
    condition: 'new',
    price: 15,
    images: ['https://images.unsplash.com/photo-1618142784523-28956920f188?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Da Vinci Maestro Kolinsky Watercolor Brush (Size 6)',
    description: 'Top tier watercolor round brush. Holds a ton of water and has a perfect point. Washed carefully with brush soap after every use.',
    category: 'Brushes',
    condition: 'used',
    price: 28,
    images: ['https://images.unsplash.com/photo-1576402830866-9b57700e57f5?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Huion Kamvas 13 Pen Display',
    description: 'Switching to iPad, so selling my Kamvas 13. Comes with pen, stand, and all cables. Screen protector applied since day 1.',
    category: 'Tools',
    condition: 'used',
    price: 150,
    images: ['https://images.unsplash.com/photo-1588693740266-9b2f6fb39f60?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Speedball Linoleum Block Printing Starter Kit',
    description: 'Includes lino cutter handle, 3 blades, brayer, and black block printing ink. Missing the actual lino blocks.',
    category: 'Tools',
    condition: 'used',
    price: 20,
    images: ['https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Faber-Castell Polychromos Colored Pencils (36 Tin)',
    description: 'High quality oil-based colored pencils. Only used a couple of times for a specific project. Tin has a small dent.',
    category: 'Pens/Markers',
    condition: 'used',
    price: 40,
    images: ['https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Arches Watercolor Block 9x12 Cold Press',
    description: 'The gold standard of watercolor paper. 100% cotton, 140lb. 18 sheets remaining on the block.',
    category: 'Sketchbooks',
    condition: 'used',
    price: 25,
    images: ['https://images.unsplash.com/photo-1580136608051-2dbefde6fc0b?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Gouache Paint Set by Holbein (12 colors)',
    description: 'Opaque watercolor set. Used for a few illustrations. Most tubes are 80-90% full. Beautiful matte finish.',
    category: 'Paints',
    condition: 'used',
    price: 32,
    images: ['https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop']
  },
  {
    title: 'Pro Arte Sabeline Synthetic Brushes Set',
    description: 'Set of 5 flat brushes for acrylic or oil. Brand new, never used. Still have the protective caps on.',
    category: 'Brushes',
    condition: 'new',
    price: 15,
    images: ['https://images.unsplash.com/photo-1576402830866-9b57700e57f5?q=80&w=800&auto=format&fit=crop']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    let user = await User.findOne({ email: 'test@example.com' });
    if (!user) {
      user = await User.create({
        name: 'Community Artist',
        email: 'test@example.com',
        password: 'password123',
        location: 'San Francisco, CA'
      });
      console.log('Created dummy user');
    }

    const listingsWithUser = sampleListings.map(listing => ({
      ...listing,
      seller: user._id
    }));

    await Listing.insertMany(listingsWithUser);
    console.log(`Inserted ${sampleListings.length} mock listings!`);

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
