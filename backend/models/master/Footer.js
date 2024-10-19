const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const footerSchema = new mongoose.Schema({
    logo: {
        type: String, // URL or path to the image logo
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    copyright: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Apply the soft delete plugin to the schema
footerSchema.plugin(softDeletePlugin);

const Footer = mongoose.model('Footer', footerSchema);

module.exports = Footer;
