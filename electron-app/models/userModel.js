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

function deleteUser(id) {
    console.log(id)
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id = ?",
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
                console.log(result)
            }
        )
    });
}

module.exports = {
    getAllUsers,
    deleteUser
}