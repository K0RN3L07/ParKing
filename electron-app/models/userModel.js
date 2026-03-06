const db = require("../config/db");

function getAllUsers() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users",
            (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAllUsers
}