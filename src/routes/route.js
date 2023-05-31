const express = require('express');
const router =express.Router();
const{ createUrl, getUrl}=require("../controller/urlController")



router.post('/url/shorten',createUrl)
router.get('/:urlcode',getUrl)

module.exports = router;