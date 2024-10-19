const express = require('express');
const Blog = require('../../models/Blog');

async function blog(req, res){
    try {
        const blogs = await Blog.find().populate('author', 'name');
        res.json(blogs);
      } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {blog};