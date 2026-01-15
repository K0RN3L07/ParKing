const User = require('../models/userModel');

async function getEditProfile(req, res) {
    try {
        // If you still want to render the page, you can return a success message optionally
        res.render('editProfile', {
            user: req.session.user || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Hiba a profil szerkesztése oldal betöltésekor", success: false });
    }
}

module.exports = {
    getEditProfile
};