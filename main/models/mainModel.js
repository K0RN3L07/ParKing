const db = require('../config/database');

// exports.getAllUsers = () => {
//     return new Promise((resolve, reject) => {
//         db.query("SELECT * FROM users", (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// };

exports.registerUser = (name, email, phone_num, password) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (name, email, phone_num, password) VALUES (?, ?, ?, ?)",
            [name, email, phone_num, password],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            }
        );
    });
}

exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
}