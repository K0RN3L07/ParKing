require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json())
const mainRoute = require('./routes/mainRoute');

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use('/', mainRoute.router);

app.listen(PORT, () => {
    console.log('A szerver elérhető: http://localhost:3000');
});