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
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM users WHERE id = ?",
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    });
}

function editUser(id, name, email, phone_num, password) {
    return new Promise ((resolve, reject) => {
        db.query("UPDATE users SET name=?, email=?, phone_num=?, password=? WHERE id=?",
            [name, email, phone_num, password, id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result)
            }
        )
    });
}

module.exports = {
    getAllUsers,
    deleteUser,
    editUser
}