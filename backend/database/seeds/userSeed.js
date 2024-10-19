const mongoose = require('../../server');
const User = require('../../models/User');

const seedUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'admin@example.com' });
    if (existingUser) {
      console.log('User already exists. No need to seed.');
      process.exit(0);
    }

    const newUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      password: '12345678',
    });

    await newUser.save();
    console.log('User seeded successfully!');
  } catch (error) {
    console.error('Error seeding user:', error.message);
  } finally {
    mongoose.connection.close(); 
  }
};

// Execute the seed function
module.exports = seedUser;
