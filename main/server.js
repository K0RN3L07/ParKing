require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mainRoute = require('./routes/mainRoute');
const bookingRoute = require('./routes/bookingRoutes');
const path = require('path');

const app = express();

app.use(
    session({
        secret: 'supersecret123',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 }
    })
);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoute.mainRouter);
app.use('/', bookingRoute.bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`A szerver elérhető: http://localhost:${PORT}`);
});