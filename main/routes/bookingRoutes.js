const express = require('express');
const bookingController = require('../controllers/bookingController');
const bookingRouter = express.Router();

bookingRouter.get('/myBookings', bookingController.getMyBookings);
bookingRouter.get('/newBooking', bookingController.getNewBooking);

bookingRouter.post('/bookSlot', bookingController.bookSlot);
bookingRouter.post('/getAllReservedOnFloor', bookingController.getAllReservedOnFloor);

bookingRouter.post("/getParkingSpaceTypeAndPrice", bookingController.getParkingSpaceTypeAndPrice)

bookingRouter.delete('/deleteBooking/:id', bookingController.deleteBooking);

module.exports = {bookingRouter}