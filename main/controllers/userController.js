const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Main = require('../models/mainModel');

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

async function editProfileData(req, res) {
    try {
        let user_id = req.session.user?.id;

        if (!user_id) {
            return res.status(401).json({ msg: "Nincs bejelentkezve!", success: false });
        }
        const new_data = req.body;
        await User.editProfileData(user_id, new_data);

        req.session.user = {
            id: req.session.user.id,
            name: new_data.name,
            email: new_data.email,
            phone_num: new_data.phone_num
        };

        return res.status(200).json({ msg: "Sikeres módosítás!", success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Szerver oldali hiba!", success: false });
    }
}

async function doPasswordsMatch(req, res) {
    try {
        const { password } = req.body.password;

        const user = await Main.getUserByEmail(req.session.user?.email);
        const user_id = user.id;

        console.log(user);

        if (!user_id) {
            return res.status(401).json({ msg: "Nincs bejelentkezve!", success: false });
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match){
            console.log("not match");
            
        };

        return res.status(200).json({ msg: "Sikeres változtatás!", success: true })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Szerver oldali hiba!", success: false });
    }
}

module.exports = {
    getEditProfile,
    editProfileData,
    doPasswordsMatch
};