const express = require('express');
const Course = require('../../models/master/course');

async function create (req, res){
    const { name } = req.body;

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to create a Course' });
    }

    try{
        const courseExist = await Course.findOne({name:name});
        if(courseExist){
            return res.status(409).json({ message: 'Already exist this course' });
        }
        const course = new Course({
            name,
            author: req.user._id
        });
        await course.save();
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function index(req, res)
{
    try{
        const userRole = req.user.role;
        if (userRole === 'admin') {
          const courses = await Course.find();
          res.json(courses);
        }
    }catch{
        res.status(400).json({message:error.message});
    }
}

async function drop(req, res){
    try {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'course not found' });
    }
    // Delete the blog from the database
    await Course.softDelete({_id:req.params.id});
        res.json({ message: 'course removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    
}

module.exports = {create, index, drop};