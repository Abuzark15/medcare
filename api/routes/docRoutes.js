const express = require('express');
const upload = require('../middleware/multer');  
const { requestToBeDoctor, getRequests } = require('../controller/docCon'); 
const router = express.Router();

router.post('/request-for-doctor', upload.single('profilePicture'), requestToBeDoctor);
router.get('/getrequest', getRequests);

module.exports = router;