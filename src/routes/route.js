
const express = require('express');

const router = express.Router();

//importing modules
const { createUrl, redirectUrl } = require("../controller/urlController");

// calling APIs
router.post('/url/shorten', createUrl)
router.get('/:urlCode', redirectUrl)

module.exports = router;