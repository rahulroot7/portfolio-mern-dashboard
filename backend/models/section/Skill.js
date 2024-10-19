const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

// Define the skill object structure
const SkillItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

// Define the main SkillSchema
const SkillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [SkillItemSchema], // Change to array of SkillItemSchema
        required: true
    },
}, {
    timestamps: true
});

// Apply the soft delete plugin to the schema
SkillSchema.plugin(softDeletePlugin);
const Skill = mongoose.model('Skill', SkillSchema);
module.exports = Skill;
