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

async function editUser(id, name, email, phone_num, password) {
    try {
        const users = await userModel.editUser(id, name, email, phone_num, password);
        return users;
    } catch (error) {
        console.log(`Error editing user ${id}: ${error}`);
        return [];
    }
}

module.exports = {
    getUsers,
    deleteUser,
    editUser
};