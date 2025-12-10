const express = require('express');
const bookingController = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/myBookings', bookingController.getMyBookings)
bookingRouter.get('/newBooking', bookingController.getNewBooking);

bookingRouter.get('/getUserBookings', bookingController.getUserBookings);

bookingRouter.post('/bookSlot', bookingController.bookSlot);
bookingRouter.post('/getAllReservedOnFloor', bookingController.getAllReservedOnFloor);

module.exports = {bookingRouter}