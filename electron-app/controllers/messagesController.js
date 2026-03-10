const messagesModel = require("../models/messagesModel");

async function getAllMessages() {
    try {
        const messages = await messagesModel.getAllMessages();
        return messages;
    }
    catch (error) {
        console.log("Error getting messages:", error);
        return [];
    }
}

module.exports = {
    getAllMessages
}