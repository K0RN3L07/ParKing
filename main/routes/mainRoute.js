const controller = require('../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.getIndex);
router.get('/login', controller.getLogin);
router.get('/register', controller.getRegister);

module.exports = {router};