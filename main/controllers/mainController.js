function getIndex(req, res) {
    res.render('index', "");
}

function getLogin(req, res) {
    res.render('login', "");
}

function getRegister(req, res) {
    res.render('register', "");
}

module.exports = { getIndex, getLogin, getRegister };