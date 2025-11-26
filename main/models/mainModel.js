const db = require('../config/database')

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM users", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.registerUser = (name, email, phone_num, password) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO users (name, email, phone_num, password) VALUES (?, ?, ?, ?)",
            [name, email, phone_num, password],
            (err, result) =>{
                if (err) return reject(err);
                resolve(result.insertId)
            }
        )
    })
}

// exports.modifyUser = (name, email, phone_num, password) => {
//     return new Promise((resolve, reject) => {
//         db.query(
//             "UPDATE users SET name=?, email=?, phone_num=?, password=? WHERE 1"
//         )
//     })
// }