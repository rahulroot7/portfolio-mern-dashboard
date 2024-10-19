const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const headerSchema = new mongoose.Schema({
    logo: {
        type: String, // URL or path to the image logo
        required: true
    },
    menu: {
        type: String,
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
    contact: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

// Apply the soft delete plugin to the schema
headerSchema.plugin(softDeletePlugin);

const Header = mongoose.model('Header', headerSchema);

module.exports = Header;
