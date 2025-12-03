const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);

router.get('/users', controller.getUsers);

router.post('/users/register', controller.registerUser);
router.post('/users/login', controller.loginUser);

router.get('/logout', controller.logoutUser);

module.exports = {router};