require('dotenv').config();
const express = require('express');
const app = express();
const mainRoute = require('./routes/mainRoute');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoute.router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`A szerver elérhető: http://localhost:${PORT}`);
});