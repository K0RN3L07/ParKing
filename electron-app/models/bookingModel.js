const db = require("../config/db");

function getAllBookings() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT bookings.id, users.name, bookings.plate_num, CONCAT(parking_spaces.floor_num, " emelet, ", parking_spaces.parking_space_num, ". hely") AS parking_num, bookings.start_time, bookings.end_time, bookings.parking_status, bookings.payment_status, bookings.total_price, bookings.booked_at
                FROM bookings INNER JOIN users
                ON users.id = bookings.user_id INNER JOIN parking_spaces
                ON parking_spaces.id = bookings.parking_space_id`,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function deleteBooking(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM bookings WHERE id = ?",
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    });
}

module.exports = {
    getAllBookings,
    deleteBooking
}