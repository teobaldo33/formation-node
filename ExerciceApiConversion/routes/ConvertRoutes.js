const express = require('express')
const router = express.Router();

const {convert} = require('../controllers/ConvertController')

router.post('/convert', convert)


module.exports = router;