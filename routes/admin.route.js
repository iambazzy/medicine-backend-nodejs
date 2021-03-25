const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/admin.controller');
const { isAdmin } = require('../middleware/admin.middleware');

// Admin
router.post('/signup', isAdmin, AdminController.signup);
router.post('/signin', isAdmin, AdminController.signin);

module.exports = router;