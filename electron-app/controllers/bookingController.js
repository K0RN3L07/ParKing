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

async function getParkingSpaceId(floor_num, parking_space_num) {
    try {
        const result = await bookingModel.getParkingSpaceId(floor_num, parking_space_num);
        return result;
    } catch (error) {
        console.error("Error getting parking space ID:", error);
        return null;
    }
}

async function editBooking(id, plate_num, start_time, end_time, parking_space_id) {
    try {
        const result = await bookingModel.getPricePerHourByParkingSpaceId(parking_space_id);
        const price_per_hour = result.price_per_hour;

        const start = new Date(start_time);
        const end = new Date(end_time);
        const msDiff = end - start;
        const hours = msDiff / (1000 * 60 * 60);

        let total_price = price_per_hour * Math.ceil(hours);
        
        const bookings = await bookingModel.editBooking(id, plate_num, start_time, end_time, total_price, parking_space_id);
        return bookings;
    } catch (error) {
        console.log(`Error editing booking ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getAllBookings,
    deleteBooking,
    getParkingSpaceId,
    editBooking
}