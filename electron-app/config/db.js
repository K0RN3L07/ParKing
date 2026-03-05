const mysql = require("mysql2");

const db = mysql.createConnection({
    database: 'parking',
    user: 'root',
    password: '',
    host: 'localhost'
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }

    console.log("Database connected successfully");
})

module.exports = db;