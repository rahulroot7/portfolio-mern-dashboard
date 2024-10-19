const express = require('express');
const { protect, adminAuth } = require('../middleware/authMiddleware');
const {create, index, edit, update, drop, multipleForm} = require('../controller/blogController');
const multer = require('multer');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // folder where images will be stored
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });
const uploadmulti = upload.fields([
  { name: 'frontImg'},
  { name: 'backImg'}
]);

// Create a Blog (Protected Route)
router.post('/create/', protect, adminAuth, upload.single('image'), create);

// Get All Blogs (Public Route)
router.get('/', protect, adminAuth, index);

// Get Blog by ID (Public Route)
router.get('/edit/:id', protect, edit);

// Update a Blog (Protected Route)
router.put('/update/:id', protect, upload.single('image'), update);

// Delete a Blog (Protected Route)
router.delete('/delete/:id', protect, drop);

// multiple userwise file upload
router.post('/multifile',protect, uploadmulti, multipleForm);

module.exports = router;
