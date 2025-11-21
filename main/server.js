require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const mainRoute = require('./routes/mainRoute');

app.set('view engine', 'ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static('public'));

app.use('/', mainRoute.router);

app.listen(PORT, () => {
    console.log('A szerver elérhető: http://localhost:3000');
});