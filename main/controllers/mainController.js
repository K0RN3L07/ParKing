const User = require('../models/mainModel');

function getIndex(req, res) {
    res.render('mainpage', "");
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
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(500).json({ error: err });
    }
};

async function registerUser (req, res) {
    const {name, email, phone_num, password} = req.body;
    const id = await User.registerUser(name, email, phone_num, password);

    if (!name || !email || !phone_num || !password){
        return res.status(400).json({msg: 'error'})    
    }
    else{
        res.redirect('/login');
        //return res.status(200).json({message: "Felhasználó hozzáadva!", id});
    }

}


module.exports = { getIndex, getLogin, getRegister, getUsers, registerUser};