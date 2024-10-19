const seedHeader = require('./headerSeed'); 
const seedUser = require('./userSeed'); 
const seedFooter = require('./footerSeed');
const bannerSeed = require('./bannerSeed');
const skillSeed = require('./skillSeed');
const projectSeed = require('./projectSeed');

async function runAllSeeders() {
  try {
    console.log('Seeding headers...');
    // await seedHeader();
    console.log('Headers seeded successfully!');

    console.log('Seeding footer...');
    // await seedFooter();
    console.log('Footer seeded successfully!');

    console.log('Seeding Banner...');
    // await bannerSeed();
    console.log('Banner seeded successfully!');

    console.log('Seeding Skill...');
    // await skillSeed();
    console.log('Skill seeded successfully!');

    console.log('Seeding project...');
    await projectSeed();
    console.log('Project seeded successfully!');

  } catch (error) {
    console.error('Error running seeders:', error.message);
  } finally {
    process.exit();
  }
}

runAllSeeders();
