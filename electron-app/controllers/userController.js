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

async function deleteUser(id) {
    try {
        const users = await userModel.deleteUser(id);
        return users;
    } catch (error) {
        console.error(`Error deleting user ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getUsers,
    deleteUser
};