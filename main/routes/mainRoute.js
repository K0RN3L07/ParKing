const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);

router.get('/users', controller.getUsers);
router.post('/users', controller.addUser);

module.exports = {router};