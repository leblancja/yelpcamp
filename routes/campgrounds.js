const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const {campgroundSchema} = require('../schemas.js')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


router.route('/') 
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));


router.get('/new', isLoggedIn, campgrounds.newForm);


router.route('/:id')
    .get(catchAsync(campgrounds.show))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.update))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.delete));

    
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.editForm));


router.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

module.exports = router;