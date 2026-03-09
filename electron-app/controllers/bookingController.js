const bookingModel = require("../models/bookingModel");

async function getAllBookings() {
    try {
        const bookings = await bookingModel.getAllBookings();
        return bookings;
    } catch (error) {
        console.error("Error getting users:", error);
        return [];
    }
}

module.exports = {
    getAllBookings
}