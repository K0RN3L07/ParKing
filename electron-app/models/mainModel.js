const db = require("../config/db");

function getUserCount() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(id) AS num FROM users",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function getActiveBookingCount() {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(id) AS db FROM bookings WHERE parking_status='Aktív'",
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

function getTodaysRevenue() {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(bookings.total_price) AS revenue FROM bookings WHERE DATE(bookings.start_time) = CURRENT_DATE GROUP BY DATE(bookings.start_time);",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
    });
}

function getAverageBookingTime() {
    return new Promise((resolve, reject) => {
        db.query("SELECT AVG(TIMESTAMPDIFF(HOUR, start_time, end_time)) AS avg_time FROM bookings;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

// Statistic for charts

// Line Chart
function getBookingsPerDay() {
    return new Promise((resolve, reject) => {
        db.query("SELECT DATE(start_time) AS day, COUNT(*) AS booking_count FROM bookings GROUP BY day ORDER BY day;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

// Bar Chart
function getPeakParkingHours() {
    return new Promise((resolve, reject) => {
        db.query("SELECT HOUR(start_time) AS hour, COUNT(*) AS hour_count FROM bookings GROUP BY hour ORDER BY hour;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

// Bar Chart
function getMostUsedParkingSpaces() {
    return new Promise((resolve, reject) => {
        db.query("SELECT CONCAT(parking_spaces.floor_num, ' emelet, ', parking_spaces.parking_space_num, '. hely') AS parking_slot, COUNT(*) AS usage_count FROM bookings INNER JOIN parking_spaces ON parking_spaces.id = bookings.parking_space_id GROUP BY parking_space_id ORDER BY usage_count DESC LIMIT 10;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

// Line Chart
function getRevenueOverTime() {
    return new Promise((resolve, reject) => {
        db.query("SELECT DATE(start_time) AS day, SUM(total_price) AS revenue FROM bookings GROUP BY day ORDER BY day;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

// Pie Chart
function getBookingsByStatus() {
    return new Promise((resolve, reject) => {
        db.query("SELECT parking_status, COUNT(*) AS count FROM bookings GROUP BY parking_status;",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

module.exports = {
    getUserCount,
    getActiveBookingCount,
    getAllBookingPrices,
    getTodaysRevenue,
    getAverageBookingTime,

    getBookingsPerDay,
    getPeakParkingHours,
    getMostUsedParkingSpaces,
    getRevenueOverTime,
    getBookingsByStatus,
}