const db = require('../config/database');

exports.addBooking = (
    user_id,
    parking_space_id,
    start,
    end,
    plate_num) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO bookings (user_id, parking_space_id, start_time, end_time, payment_status, plate_num) VALUES (?, ?, ?, ?, ?, ?)",
            [user_id, parking_space_id, start, end, "fizetve", plate_num],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            }
        );
    });
}

exports.getParkingSpaceId = (floor, slot) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT id FROM parking_spaces WHERE floor_num = ? AND parking_space_num = ?",
            [floor, slot],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

exports.getAllReservedOnFloor = (floor, start, end) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT DISTINCT parking_spaces.parking_space_num
             FROM parking_spaces
             JOIN bookings 
               ON parking_spaces.id = bookings.parking_space_id
             WHERE parking_spaces.floor_num = ?
               AND bookings.start_time < ?
               AND bookings.end_time > ?`,
            [floor, end, start],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}

exports.getUserBookings = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            `
            SELECT bookings.id, parking_spaces.floor_num, parking_spaces.parking_space_num, bookings.start_time, bookings.end_time, bookings.parking_status, bookings.plate_num, parking_spaces.type
            FROM parking_spaces INNER JOIN bookings
            ON parking_spaces.id = bookings.parking_space_id INNER JOIN users
            ON users.id = bookings.user_id
            WHERE users.id = ?
            ORDER BY bookings.start_time
            `,
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}


exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "DELETE FROM bookings WHERE id = ?",
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.affectedRows);
            }
        );
    });
}


exports.getParkingSpaceTypeAndPrice = (id) => {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT parking_spaces.type, parking_spaces.price_per_hour FROM parking_spaces WHERE parking_spaces.id = ?",
            [id],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
}

exports.setStatuses = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT 
                bookings.id,
                bookings.start_time,
                bookings.end_time,
                IF(
                    bookings.end_time < CURRENT_TIMESTAMP,
                    'lejárt',
                    IF(
                        CURRENT_TIMESTAMP BETWEEN bookings.start_time AND bookings.end_time,
                        'aktív',
                        'későbbi'
                    )
                ) AS status
                FROM bookings
                ORDER BY bookings.start_time`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};