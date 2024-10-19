const mongoose = require('mongoose');
const {softDeletePlugin } = require('soft-delete-plugin-mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps:true
});

// Apply the soft delete plugin to the schema
courseSchema.plugin(softDeletePlugin );

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
