const controller = require('../controllers/mainController');
const express = require('express');
const router = express.Router();

router.get('/', controller.getIndex);

module.exports = {router};