const mongoose = require('../../server'); // Import Mongoose from server.js
const Footer = require('../../models/master/Footer'); // Adjust the path to your Footer model

const seedFooter = async () => {
  try {
    // Check if any Footer already exists
    const existingFooter = await Footer.findOne();
    if (existingFooter) {
      console.log('Footer already exists. No need to seed.');
      process.exit(0);
    }

    const newFooter = new Footer({
      logo: '/path/to/logo.png',
      linkedin: 'https://www.linkedin.com/in/example',
      github: 'https://github.com/example',
      facebook: 'https://facebook.com/example',
      instagram: 'https://instagram.com/example',
      copyright: 'Copyright 2024. All Rights Reserved (RahulRoot)',
    });

    await newFooter.save();
    console.log('Footer seeded successfully!');
  } catch (error) {
    console.error('Error seeding Footer:', error.message);
  } finally {
    mongoose.connection.close(); // Close the DB connection after seeding
  }
};

// Run the seed function
module.exports = seedFooter
