const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Reference to the user who created the blog
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String // URL or path to the image
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who created the blog
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
