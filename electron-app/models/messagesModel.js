const db = require("../config/db");

function getAllMessages() {
    return new Promise((reject, resolve) => {
        db.query("SELECT messages.id, users.name AS name, messages.message, messages.sent_at FROM messages INNER JOIN users ON users.id = messages.user_id",
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
    })
}

module.exports = {
    getAllMessages
}