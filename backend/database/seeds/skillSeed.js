const mongoose = require('../../server');
const Skill = require('../../models/section/Skill');

const skillSeed = async () => {
    try {
        // Check if any skills already exist
        const existingSkill = await Skill.findOne();
        if (existingSkill) {
            console.log('Skills already exist. No need to seed.');
            process.exit(0);
        }

        const skillsData = [
            { name: "Web Development", percentage: 90 },
            { name: "Laravel", percentage: 85 },
            { name: "JavaScript", percentage: 80 },
            { name: "AWS", percentage: 70 },
            { name: "Git", percentage: 75 },
            { name: "Wordpress", percentage: 65 },
            { name: "HTML", percentage: 95 },
            { name: "React", percentage: 85 },
        ];

        // Create a new skill document
        const newSkill = new Skill({
            title: "Welcome to my Portfolio",
            description: `Hi! I'm Rahul Root Web Developer`,
            skills: skillsData, // Store the skills array
        });

        // Save the new skill to the database
        await newSkill.save();
        console.log('Skills seeded successfully!');
    } catch (error) {
        console.error('Error seeding skills:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seed function
module.exports = skillSeed;