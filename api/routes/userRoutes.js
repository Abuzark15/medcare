const express = require('express');
const { registerPatient, loginPatient, getDoctors } = require('../controller/userController');
const router = express.Router();

// Patient registration
router.post('/register', registerPatient);

// Patient login
router.post('/login', loginPatient);

router.get('/doctors', getDoctors);

module.exports = router;
