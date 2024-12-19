const express = require('express');
const router = express.Router();
const { approvedRequest } = require('../controller/adminController');

router.post('/accept-request/:id', approvedRequest);

module.exports = router;