const express = require('express');
const router = express.Router();

const {
    signinUser,
    loginUser,
    logoutUser
} = require('../controllers/UserController');



router.post('/signin', signinUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

module.exports = router;