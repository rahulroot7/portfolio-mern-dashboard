const mongoose = require('../../server');
const Banner = require('../../models/section/Banner');

const bannerSeed  = async () => {
    try {
      // Check if any header already exists
      const existingBanner = await Banner.findOne();
      if (existingBanner) {
        console.log('Banner already exists. No need to seed.');
        process.exit(0);
      }
  
      const newBanner = new Banner({
        title: "Welcome to my Portfolio",
        heading: `Hi! I'm Rahul Root Web Developer`,
        description: `Hi, I'm Rahul Root, a passionate web developer with a strong foundation in modern web technologies. With expertise in front-end and back-end development, I strive to create seamless, efficient, and responsive web applications that provide an excellent user experience. My journey as a developer has honed my skills in languages like JavaScript, PHP, and frameworks such as Laravel and React, allowing me to build dynamic and user-friendly websites. I'm always learning and adapting to the latest trends and technologies to deliver top-quality solutions for every project. Let’s build something amazing together!`,
        url: 'connect',
        image: '/path/to/logo.png',
      });
  
      await newBanner.save();
      console.log('Banner seeded successfully!');
    } catch (error) {
      console.error('Error seeding header:', error.message);
    } finally {
      mongoose.connection.close(); // Close the DB connection after seeding
    }
  };
  
  // Run the seed function
  module.exports = bannerSeed;  