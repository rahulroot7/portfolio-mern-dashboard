const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

// Define the schema for individual project items
const ProjectItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

// Define the schema for the main project collection
const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projects: {
        type: [ProjectItemSchema],
        required: true
    }
}, {
    timestamps: true
});

ProjectSchema.plugin(softDeletePlugin);
const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
