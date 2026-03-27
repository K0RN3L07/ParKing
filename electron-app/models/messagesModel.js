const db = require("../config/db");

function getAllMessages() {
    return new Promise((resolve, reject) => {
        db.query("SELECT messages.id, users.name AS name, messages.message, messages.sent_at FROM messages INNER JOIN users ON users.id = messages.user_id",
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        )
    })
}

function deleteMessage(id) {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM messages WHERE id = ?",
            [id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    });
}

module.exports = {
    getAllMessages,
    deleteMessage
}