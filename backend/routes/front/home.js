const express = require('express');
const {blog} = require('../../controller/front/homeController');

const router = express.Router();

// Get All blogs (Public Route)
router.get('/', blog);

module.exports = router;