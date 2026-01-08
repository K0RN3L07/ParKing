const bcrypt = require('bcrypt');
const User = require('../models/mainModel');

function getIndex(req, res) {
    res.render('mainpage', { user: req.session.user || null });
}

function getLogin(req, res) {
    res.render('login', { success: true, msg: null });
}

function getRegister(req, res) {
    res.render('register', { success: true, msg: null });
}

function getError(req, res) {
    res.render('errorpage', {
        user: req.session.user || null,
        code: null,
        error: null,
        success: false
    });
}

async function registerUser(req, res) {
    try {
        const { name, email, phone_num, password } = req.body;

        if (!name || !email || !phone_num || !password) {
            return res.status(400).json({
                msg: "Minden mező kitöltése kötelező!",
                success: false
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.registerUser(name, email, phone_num, hashedPassword);

        return res.status(201).json({
            msg: "Sikeres regisztráció!",
            success: true
        });
        // ha inkább redirect kell:
        // return res.redirect('/login');

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Hiba történt a regisztráció során!",
            success: false
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Email cím és jelszó megadása kötelező!",
                success: false
            });
        }

        const user = await User.getUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                msg: "Helytelen email cím vagy jelszó!",
                success: false
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                msg: "Helytelen email cím vagy jelszó!",
                success: false
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone_num: user.phone_num
        };

        return res.status(200).json({
            msg: "Sikeres bejelentkezés!",
            success: true
        });
        // vagy:
        // return res.redirect('/');

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: "Hiba történt a bejelentkezés során!",
            success: false
        });
    }
}

async function logoutUser(req, res) {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                msg: "Hiba történt a kijelentkezéskor!",
                success: false
            });
        }

        return res.status(200).json({
            msg: "Sikeres kijelentkezés!",
            success: true
        });
        // vagy:
        // res.redirect('/');
    });
}

module.exports = {
    getIndex,
    getLogin,
    getRegister,
    getError,
    registerUser,
    loginUser,
    logoutUser
};
