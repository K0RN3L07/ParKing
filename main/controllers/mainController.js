const User = require('../models/mainModel');

function getIndex(req, res) {
    res.render('index', "");
}

function getLogin(req, res) {
    res.render('login', "");
}

function getRegister(req, res) {
    res.render('register', "");
}


async function getUsers(req, res) {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};

async function registerUser (req, res) {
    try{
        const {name, email, phone_num, password} = req.body;
        const id = await User.registerUser(name, email, phone_num, password);
        res.redirect('/login');
        res.status(200).json({message: "Felhasználó hozzáadva!", id});
    }
    catch (err){
        res.status(500).json({error: err});
    }
}


module.exports = { getIndex, getLogin, getRegister, getUsers, registerUser};