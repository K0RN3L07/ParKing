const db = require('../config/database');

exports.editProfileData = (userId, data) => {
    return new Promise((resolve, reject) => {
        db.query(`
            UPDATE users
            SET name = ?, email = ?, phone_num = ?
            WHERE id = ? 
            `,
            [data.name, data.email, data.phone_num, userId],
            (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}