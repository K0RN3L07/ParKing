const mainModel = require("../models/mainModel");

async function getUsers() {
    try {
        const users = await mainModel.getAllUsers();
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        return [];
    }
}

module.exports = {
    getUsers
};