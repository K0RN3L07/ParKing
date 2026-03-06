const userModel = require("../models/userModel");

async function getUsers() {
    try {
        const users = await userModel.getAllUsers();
        return users;
    } catch (error) {
        console.error("Error getting users:", error);
        return [];
    }
}

module.exports = {
    getUsers
};