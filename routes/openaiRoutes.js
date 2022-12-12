const express = require('express');
const router = express.Router();
const { generateimage } = require('../controllers/openaiController');

router.post('/generateimage', generateimage);

module.exports = router;