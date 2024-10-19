const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { create, index, drop } = require('../controller/master/courseController');
const { headerUpdate, headerView, footerUpdate, footerView } = require('../controller/master/settingController');
const { 
        bannerView,
        bannerUpdate, 
        skillView, 
        skillUpdate, 
        projectView, 
        projectUpdate, 
        contact, 
        contactList
     } = require('../controller/section/sectionController');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // folder where images will be stored
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Set up multer for file uploads
const upload = multer({ storage });
const uploadMultiple = multer({
    storage: storage,
}).any();

// Course routes
router.get('/course', protect, index);
router.post('/course/create', protect, create);
router.delete('/course/delete/:id', protect, drop);

// Header routes
router.get('/header', headerView);
router.put('/header/update/:id', protect, upload.single('logo'), headerUpdate);

// Footer routes
router.get('/footer', footerView);
router.put('/footer/update/:id', protect, upload.single('logo'), footerUpdate);

// Portfolio Section routes
router.get('/banner', bannerView);
router.put('/banner/update/:id', protect, upload.single('image'), bannerUpdate);
router.get('/skill', skillView);
router.put('/skill/update/:id', protect, upload.single('image'), skillUpdate);
router.get('/project', projectView);
router.put('/project/update/:id', protect, uploadMultiple, projectUpdate);
router.get('/contact/list', protect, contactList);
router.post('/contact', contact);

module.exports = router;