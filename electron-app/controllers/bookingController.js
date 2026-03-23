const bookingModel = require("../models/bookingModel");

async function getAllBookings() {
    try {
        const bookings = await bookingModel.getAllBookings();
        return bookings;
    } catch (error) {
        console.error("Error getting bookings:", error);
        return [];
    }
}

async function deleteBooking(id) {
    try {
        const bookings = await bookingModel.deleteBooking();
        return bookings;
    } catch (error) {
        console.error(`Error deleting booking ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getAllBookings,
    deleteBooking
}