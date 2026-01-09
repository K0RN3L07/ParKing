const express = require('express');
const mainController = require('../controllers/mainController');
const mainRouter = express.Router();

mainRouter.get('/', mainController.getIndex);
mainRouter.get('/login', mainController.getLogin);
mainRouter.get('/register', mainController.getRegister);

// mainRouter.get('/users', mainController.getUsers);
mainRouter.post('/users/register', mainController.registerUser);
mainRouter.post('/users/login', mainController.loginUser);

mainRouter.post('/logout', mainController.logoutUser);

module.exports = {mainRouter}