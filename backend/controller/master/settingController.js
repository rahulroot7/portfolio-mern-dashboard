const express = require('express');
const Header = require('../../models/master/header'); // Ensure the path is correct
const Footer = require('../../models/master/Footer');

async function headerView(req, res) {
    try {
        const header = await Header.findOne().sort({ createdAt: -1 }).exec();        
        if (!header) {
            return res.status(404).json({ message: 'Header not found.' });
        }
        res.status(200).json(header);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
}

async function headerUpdate(req, res) {
    const { id } = req.params;
    const { menu, linkedin, github, facebook, instagram, contact } = req.body;
    if (req.file) {
        var logo  = req.file.path ?? '';
    }

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update the Header' });
    }
    try {
        const updatedHeader = await Header.findByIdAndUpdate(
            id,
            {
                logo,
                menu,
                linkedin,
                github,
                facebook,
                instagram,
                contact
            },
            { new: true, runValidators: true }
        );

        if (!updatedHeader) {
            return res.status(404).json({ message: 'Header not found' });
        }

        res.status(200).json(updatedHeader);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function footerView(req, res){
    try{
        const footer = await Footer.findOne().sort({ createdAt: -1 }).exec();        
        if (!footer) {
            return res.status(404).json({ message: 'Footer not found.' });
        }
        res.status(200).json(footer)
    }catch(error){
        res.status(500).json({ message: 'Server error.' });
    }
}

async function footerUpdate(req, res) {
    const { id } = req.params;
    const { linkedin, github, facebook, instagram, contact } = req.body;
    if (req.file) {
        var logo  = req.file.path ?? '';
    }

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update the Footer' });
    }
    try {
        const updatedFooter = await Footer.findByIdAndUpdate(
            id,
            {
                logo,
                linkedin,
                github,
                facebook,
                instagram,
                contact
            },
            { new: true, runValidators: true }
        );

        if (!updatedFooter) {
            return res.status(404).json({ message: 'Header not found' });
        }

        res.status(200).json(updatedFooter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { headerUpdate, headerView, footerView, footerUpdate };