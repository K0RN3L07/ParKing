const express = require('express');
const mainController = require('../controllers/mainController');
const bookingController = require('../controllers/bookingController');
const router = express.Router();

router.get('/', mainController.getIndex);
router.get('/login', mainController.getLogin);
router.get('/register', mainController.getRegister);

router.get('/booking', bookingController.getBooking);

router.get('/users', mainController.getUsers);
router.post('/users/register', mainController.registerUser);
router.post('/users/login', mainController.loginUser);

router.get('/logout', mainController.logoutUser);

router.post('/bookSlot', bookingController.bookSlot);


module.exports = {router};