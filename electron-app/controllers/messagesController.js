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

async function deleteMessage(id) {
    try {
        const messages = await messagesModel.deleteMessage(id);
        return messages;
    } catch (error) {
        console.error(`Error deleting message ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getAllMessages,
    deleteMessage
}