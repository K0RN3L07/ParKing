const express = require('express');
const messagesController = require('../controllers/messagesController');
const messagesRouter = express.Router();

messagesRouter.post('/sendMessage', messagesController.sendMessage)

module.exports = {messagesRouter}
