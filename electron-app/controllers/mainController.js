const mainModel = require("../models/mainModel");

async function getUserCount() {
    try {
            const count = await mainModel.getUserCount();
            return count[0].num;
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
}

async function getBookingCount() {
    try {
            const count = await mainModel.getBookingCount();
            return count;
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
}

async function getActiveBookingCount() {
    try {
            const count = await mainModel.getActiveBookingCount();
            return count;
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
}

async function getAllBookingPrices() {
    try {
            const prices = await mainModel.getAllBookingPrices();
            return prices;
        } catch (error) {
            console.error("Error getting users:", error);
            return [];
        }
}

module.exports = {
    getUserCount,
    getBookingCount,
    getActiveBookingCount,
    getAllBookingPrices
}