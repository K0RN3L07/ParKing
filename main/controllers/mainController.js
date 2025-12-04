const bcrypt = require('bcrypt');
const User = require('../models/mainModel');
const { futimesSync } = require('fs');

function getIndex(req, res) {
    res.render('mainpage', { user: req.session.user || null });
}

function getLogin(req, res) {
    res.render('login', "");
}

function getRegister(req, res) {
    res.render('register', "");
}

function getBooking(req, res) {
    res.render('booking', "");
}


async function getUsers(req, res) {
    try {
        const users = await User.getAllUsers();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function registerUser(req, res) {
    const { name, email, phone_num, password } = req.body;

    if (!name || !email || !phone_num || !password) {
        return res.status(400).json({ msg: 'error' })
    }
    else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.registerUser(name, email, phone_num, hashedPassword);

        res.redirect('/login');
        //return res.status(200).json({message: "Felhasználó hozzáadva!", id});
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Missing email or password" });
    }

    try {
        const user = await User.getUserByEmail(email);
        const match = await bcrypt.compare(password, user.password);

        if (!user || !match) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        console.log("User logged in:", user.email);

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_num: user.phone_num
        };

        return res.redirect('/');

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

async function logoutUser(req, res) {
    return req.session.destroy(() => {
        res.redirect('/');
    });
}

module.exports = { getIndex, getLogin, getRegister, getUsers, registerUser, loginUser, logoutUser, getBooking };