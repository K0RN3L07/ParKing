const db = require('../config/database')

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

