const db = require('../config/database')

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
            )
        })
    }

exports.getParkingSpaceId = (slot, floor) => {
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
};