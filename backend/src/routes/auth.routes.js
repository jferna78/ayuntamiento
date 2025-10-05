const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Definir la ruta para el login
// POST /auth/login
router.post('/login', authController.loginController);

module.exports = router;