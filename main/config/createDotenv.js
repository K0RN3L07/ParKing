const fs = require("fs");

fs.open('.env', 'wx', (err, fd) => {
  if (err) {
    console.log('A fájl már létezik');
    return;
  }

  fs.write(fd, `DB_NAME=\nDB_USER=\nDB_PASSWORD=\nDB_HOST=\nDB_DIALECT=`, (err) => {
    if (err) {
      console.error('Írási hiba:', err);
    } else {
      console.log('.env létrehozva, töltsd fel az adatokkal!');
    }

    fs.close(fd, () => {});
  });
});
