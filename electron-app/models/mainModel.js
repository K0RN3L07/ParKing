const db = require("../config/db");

function getUserCount() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(id) FROM users",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function getBookingCount() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(id) FROM bookings",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function getActiveBookingCount() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(id) FROM bookings WHERE parking_status='Aktív'",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function getAllBookingPrices() {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(total_price) FROM bookings",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

module.exports = {
    getUserCount,
    getBookingCount,
    getActiveBookingCount,
    getAllBookingPrices
}