const mongoose = require('mongoose');
const { softDeletePlugin } = require('soft-delete-plugin-mongoose');

const ContactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid phone number'],
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

ContactSchema.plugin(softDeletePlugin);

const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
