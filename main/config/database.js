const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "parking"
});

db.connect(err => {
  if (err) {
    console.error("Hiba az adatbázishoz való csatlakozással:", err);
    return;
  }
  console.log("Sikeres csatlakozás az adatbázishoz!");
});

module.exports = db;
