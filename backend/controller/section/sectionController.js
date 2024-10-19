const express = require('express');
const Banner = require('../../models/section/Banner');
const Skill = require('../../models/section/Skill');
const Project = require('../../models/section/Project');
const Contact = require('../../models/section/Contact');
const nodemailer = require('nodemailer');

async function bannerView  (req, res) {
    try {
        const banner = await Banner.findOne().sort({ createdAt: -1 }).exec();        
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found.' });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
}

async function bannerUpdate(req, res) {
    const { id } = req.params;
    const { title, heading, description, url } = req.body;
    if (req.file) {
        var image  = req.file.path ?? '';
    }

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update the Banner' });
    }
    try {
        const bannner = await Banner.findByIdAndUpdate(
            id,
            {
                title,
                heading,
                description,
                url,
                image,
            },
            { new: true, runValidators: true }
        );

        if (!bannner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json(bannner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function skillView  (req, res) {
    try {
        const skill = await Skill.findOne().sort({ createdAt: -1 }).exec();        
        if (!skill) {
            return res.status(404).json({ message: 'Skill not found.' });
        }
        res.status(200).json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
}

async function skillUpdate(req, res) {
    const { id } = req.params;
    const { title, description, skills } = req.body;

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update the Skill' });
    }
    if (!title || !description || !Array.isArray(skills)) {
        return res.status(400).json({ message: 'Title, description, and skills are required' });
    }
    try {
        const skill = await Skill.findByIdAndUpdate(
            id,
            {
                title,
                description,
                skills,
            },
            { new: true, runValidators: true }
        );

        if (!skill) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function projectView  (req, res) {
    try {
        const project = await Project.findOne().sort({ createdAt: -1 }).exec();        
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
}

async function projectUpdate(req, res) {
    const { title, description, projects } = req.body;
    const files = req.files;
    const { id } = req.params;

    if (req.user.role !== 'author' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update the Project' });
    }
    if (!title || !description || !projects || !Array.isArray(projects)) {
        return res.status(400).json({ message: 'Title, description, and valid project data are required' });
    }
    const updatedProjects = projects.map((project, index) => {
        const projectTitle = project.title;
        const projectDescription = project.description;
        const file = files.find(f => f.fieldname === `projects[${index}][image]`);
        const imagePath = file ? file.path : project.image;
        return {
            title: projectTitle,
            description: projectDescription,
            image: imagePath,
        };
    });
    
    try {
        const projectUpdate = await Project.findByIdAndUpdate(
            id,
            {
                title,
                description,
                projects: updatedProjects,
            },
            { new: true, runValidators: true }
        );

        if (!projectUpdate) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(projectUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function contactList(req, res) {
    try {
        const contacts = await Contact.find();        
        if (!contacts) {
            return res.status(404).json({ message: 'Contact not found.' });
        }
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
}

async function contact(req, res) {
    const { firstname, lastname, email, phone, message } = req.body;
    try {
        const newContact = new Contact({
            firstname,
            lastname,
            email,
            phone,
            message,
        });
        await newContact.save();
        await sendEmail(newContact);
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function sendEmail(contact) {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: "63da060581d98b",
          pass: "1f39538a3a4fb2"
        },
      });

    // Set up email data
    const mailOptions = {
        from: contact.email,
        to: 'root@example.com',
        subject: 'New Contact Form Submission',
        text: `You have received a new contact form submission:\n\nName: ${contact.firstname} ${contact.lastname}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nMessage: ${contact.message}`,
    };
    await transporter.sendMail(mailOptions);
}

module.exports = { bannerView, bannerUpdate, skillView, skillUpdate, projectView, projectUpdate, contact, contactList };