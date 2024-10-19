const mongoose = require('../../server'); // Import Mongoose from server.js
const Header = require('../../models/master/header'); // Adjust the path to your Header model

const seedHeader = async () => {
  try {
    // Check if any header already exists
    const existingHeader = await Header.findOne();
    if (existingHeader) {
      console.log('Header already exists. No need to seed.');
      process.exit(0);
    }

    const newHeader = new Header({
      logo: '/path/to/logo.png',
      menu: "Home,Skills,Projects",
      linkedin: 'https://www.linkedin.com/in/example',
      github: 'https://github.com/example',
      facebook: 'https://facebook.com/example',
      instagram: 'https://instagram.com/example',
      contact: 'contact@example.com',
    });

    await newHeader.save();
    console.log('Header seeded successfully!');
  } catch (error) {
    console.error('Error seeding header:', error.message);
  } finally {
    mongoose.connection.close(); // Close the DB connection after seeding
  }
};

// Run the seed function
module.exports = seedHeader;
