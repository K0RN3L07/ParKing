const express = require('express');
const mainController = require('../controllers/mainController');
const mainRouter = express.Router();

router.get('/', mainController.getIndex);
router.get('/login', mainController.getLogin);
router.get('/register', mainController.getRegister);
router.get('/errorpage', mainController.getError);

router.get('/booking', bookingController.getBooking);

mainRouter.get('/users', mainController.getUsers);
mainRouter.post('/users/register', mainController.registerUser);
mainRouter.post('/users/login', mainController.loginUser);

mainRouter.get('/logout', mainController.logoutUser);


module.exports = {mainRouter};