require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const connectDB = require('./config/db');

const User = require('./models/user.model');
const Category = require('./models/category.model');
const Event = require('./models/event.model');
const Registration = require('./models/registration.model');
const Message = require('./models/message.model');

const seed = async () => {
  try {
    await connectDB();

    await Registration.deleteMany({});
    await Message.deleteMany({});
    await Event.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log('Old data deleted successfully');

    const hashedPassword = await bcrypt.hash('Admin@12345', 10);

    const admin = await User.create({
      name: 'EventPulse Admin',
      email: 'admin@eventpulse.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully');

    const categories = await Category.insertMany([
      {
        name: 'Technology',
        description: 'Technology and software events'
      },
      {
        name: 'Business',
        description: 'Business, entrepreneurship, and networking events'
      },
      {
        name: 'Arts',
        description: 'Arts, culture, and creative events'
      }
    ]);

    console.log('Categories created successfully');

    await Event.insertMany([
      {
        title: 'Tech Innovation Summit',
        description: 'A conference about the latest technology and software innovations.',
        category: categories[0]._id,
        date: new Date('2026-10-15T10:00:00'),
        city: 'Cairo',
        venue: 'Cairo International Conference Center',
        capacity: 200,
        organizer: admin._id
      },
      {
        title: 'Future of AI Workshop',
        description: 'An interactive workshop exploring artificial intelligence and its future.',
        category: categories[0]._id,
        date: new Date('2026-11-05T11:00:00'),
        city: 'Giza',
        venue: 'Smart Village',
        capacity: 100,
        organizer: admin._id
      },
      {
        title: 'Entrepreneurship Meetup',
        description: 'A networking event for entrepreneurs and startup enthusiasts.',
        category: categories[1]._id,
        date: new Date('2026-10-25T18:00:00'),
        city: 'Cairo',
        venue: 'Downtown Business Hub',
        capacity: 150,
        organizer: admin._id
      },
      {
        title: 'Creative Arts Festival',
        description: 'A festival celebrating art, culture, creativity, and local artists.',
        category: categories[2]._id,
        date: new Date('2026-12-10T16:00:00'),
        city: 'Alexandria',
        venue: 'Bibliotheca Alexandrina',
        capacity: 300,
        organizer: admin._id
      }
    ]);

    console.log('Events created successfully');

  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exitCode = 1;

  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

seed();;