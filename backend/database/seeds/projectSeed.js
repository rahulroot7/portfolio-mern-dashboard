const mongoose = require('../../server');
const Project = require('../../models/section/Project'); // Use the Project model

const projectSeed = async () => {
    try {
        // Check if any projects already exist
        const existingProject = await Project.findOne();
        if (existingProject) {
            console.log('Projects already exist. No need to seed.');
            process.exit(0);
        }
        const projectsData = [
            {
                title: "Portfolio Website",
                description: "A personal website showcasing my work and skills.",
                image: "portfolio.png"
            },
            {
                title: "E-commerce Store",
                description: "An online store with payment gateway integration.",
                image: "ecommerce.png"
            },
            {
                title: "Blog Platform",
                description: "A platform where users can publish and comment on blog posts.",
                image: "blog.png"
            }
        ];
        const newProject = new Project({
            title: "Welcome to my Portfolio",
            description: `Hi! I'm Rahul Root Web Developer`,
            projects: projectsData 
        });
        await newProject.save();
        console.log('Projects seeded successfully!');
    } catch (error) {
        console.error('Error seeding projects:', error.message);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seed function
module.exports = projectSeed;
