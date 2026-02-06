const mysql = require("mysql2");

if (process.env.NODE_ENV !== 'test') {
    const db = mysql.createConnection({
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST
    });

    db.connect(err => {
        if (err) {
            console.error("MySQL connection error:", err);
            return;
        }
    });
    module.exports = db;
}

