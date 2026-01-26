const db = require('../config/database');

exports.sendMessage = (user_id, message) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO messages (user_id, message) VALUES (?, ?)",
            [user_id, message],
            (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            }
        );
    });
}