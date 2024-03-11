const express = require('express');
const router = express.Router();
const passport = require('passport');
const ExpressError = require('../utils/ExpressError');
const { storeReturnTo } = require('../middleware');
const auth = require('../controllers/auth')

router.route('/register')
    .get(auth.regForm)
    .post(auth.createUser);


router.route('/login')
    .get(auth.loginForm)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), auth.login);


router.get('/logout', auth.logout);

module.exports = router;