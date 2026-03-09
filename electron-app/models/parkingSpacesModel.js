const db = require("../config/db");

function getAllParkingSpaces() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM parking_spaces",
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

module.exports = {
    getAllParkingSpaces
}