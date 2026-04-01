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
        const bookings = await bookingModel.deleteBooking(id);
        return bookings;
    } catch (error) {
        console.error(`Error deleting booking ${id}: ${error}`);
        return [];
    }
}

async function editBooking(id, plate_num, start_time, end_time, parking_space_id) {
    try {
        const bookings = await bookingModel.editBooking(id, plate_num, start_time, end_time, parking_space_id);
        return bookings;
    } catch (error) {
        console.log(`Error editing booking ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getAllBookings,
    deleteBooking,
    editBooking
}