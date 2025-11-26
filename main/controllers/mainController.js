function getIndex(req, res) {
    res.render('index', "");
}

function getLogin(req, res) {
    res.render('login', "");
}

function getRegister(req, res) {
    res.render('register', "");
}

const User = require('../models/mainModel')

async function getUsers(req, res) {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}


module.exports = { getIndex, getLogin, getRegister, getUsers };