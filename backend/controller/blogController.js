const express = require('express');
const Blog = require('../models/Blog');
const Vehicle = require('../models/Vehicle')
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

async function create (req, res){
    const { course, description } = req.body;

    // Check if the user is allowed to create a blog
    if (req.user.role !== 'author' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Not authorized to create a blog' });
    }

    try {
    const blog = new Blog({
        course,
        description,
        image: req.file ? req.file.path : null, // store image path
        author: req.user._id
    });

    await blog.save();
    res.status(201).json(blog);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
}

async function index(req, res){
    try {
      const userId = req.user._id;
          const blogs = await Blog.find({ author: userId }).populate('author', 'name').populate('course', 'name');
          res.json(blogs);
      } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function edit(req, res){
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'name');
    
        if (!blog) {
          return res.status(404).json({ message: 'Blog not found' });
        }
    
        res.json(blog);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

async function update(req, res){
    const { course, description } = req.body;
    try {
      // Find the blog by ID
      const blog = await Blog.findById(req.params.id);  
      // Check if the blog exists
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      // Check if the user updating the blog is the author or an admin
      if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this blog' });
      }
  
      // Update the blog details
      blog.course = course || blog.course;
      blog.description = description || blog.description;      
      if (req.file) {
        blog.image = req.file.path; // If a new image is uploaded, update the image path
      }  
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

async function drop(req, res){
    try {
    // Find the blog by ID
    const blog = await Blog.findById(req.params.id);

    // Check if the blog exists
    if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user is the author or an admin
    if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    // If the blog has an image, delete the image file from the server
    if (blog.image) {
        const imagePath = path.join(__dirname, '..', blog.image); // get full path of the image
        fs.unlink(imagePath, (err) => {
        if (err) {
            console.error('Error deleting the image:', err);
            return res.status(500).json({ message: 'Error deleting the image' });
        }
        });
    }

    // Delete the blog from the database
    await blog.deleteOne();

    res.json({ message: 'Blog and associated image removed successfully' });
    } catch (error) {
    res.status(500).json({ message: error.message });
    }    
}

async function multipleForm (req, res){
  const documents = JSON.parse(req.body.documets);
  const data = documents.map((doc,idx)=>{
    return {
      ...doc,
      frontImg:req.files.frontImg[idx].filename,
      backImg:req.files.backImg[idx].filename,
      author: req.user._id,
    }
  })
  try {
      const result = await Vehicle.create(data)
      res.status(201).json(result);
  } catch (error) {
  res.status(400).json({ message: error.message });
  }
}

module.exports = {create, index, edit, update, drop, multipleForm};