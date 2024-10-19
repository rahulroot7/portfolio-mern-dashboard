const express = require('express');
const User = require('../models/User');

// Get all users (protected route)
async function userIndex (req, res) {
    const users = await User.find();
    if(users){
        res.json(users);
    }
}

// Get user by ID (protected route)
async function userEdit(req, res) {
    const user = await User.findById(req.params.id);  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
}

// Update user (protected route)
async function userUpdate(req, res) {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
  
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
}

// Delete user (protected route)
async function userDelete(req, res) {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User Deleted Successfull' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
}

module.exports = {userIndex, userEdit, userUpdate, userDelete};