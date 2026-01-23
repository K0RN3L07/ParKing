const User = require('../models/messagesModel');

async function sendMessage(req, res) {

    try{
        const user_id = req.session.user?.id;
        if (!user_id) {
            return res.status(401).json({ msg: "Üzenet küldéséhez jelentkezz be!", success: false });
        }
    
        const {message} = req.body;
        if (!message) {
            return res.status(401).json({ msg: "Nem küldhetsz üres üzenetet!", success: false });
        }
    
        await User.sendMessage(user_id, message);

        return res.status(200).json({msg: "Köszönjük hogy elmondtad a véleményedet!", success: true});
    }
    catch {
        console.error(err);
        res.status(500).json({ msg: "Szerver hiba!", success: false });
    }

}

module.exports = {sendMessage}