const mainModel = require("../models/mainModel");

async function getUserCount() {
    try {
            const count = await mainModel.getUserCount();
            return count[0].num;
        } catch (error) {
            console.error("Error getting user count:", error);
            return [];
        }
}

async function getActiveBookingCount() {
    try {
            const count = await mainModel.getActiveBookingCount();
            return count;
        } catch (error) {
            console.error("Error getting all booking count:", error);
            return [];
        }
}

async function getAllBookingPrices() {
    try {
            const prices = await mainModel.getAllBookingPrices();
            return prices;
        } catch (error) {
            console.error("Error getting total booking price:", error);
            return [];
        }
}

async function getTodaysRevenue() {
    try {
            const revenue = await mainModel.getTodaysRevenue();
            return revenue;
        } catch (error) {
            console.error("Error getting today's total revenue:", error);
            return [];
        }
}

// Statistic for charts

// Line Chart
async function getBookingsPerDay() {
    try {
            const data = await mainModel.getBookingsPerDay();
            return data;
        } catch (error) {
            console.error("Error getting bookings per day:", error);
            return [];
        }
}

// Bar Chart
async function getPeakParkingHours() {
    try {
            const data = await mainModel.getPeakParkingHours();
            return data;
        } catch (error) {
            console.error("Error getting peak parking hours:", error);
            return [];
        }
}

// Bar Chart
async function getMostUsedParkingSpaces() {
    try {
            const data = await mainModel.getMostUsedParkingSpaces();
            return data;
        } catch (error) {
            console.error("Error getting most used parking spaces:", error);
            return [];
        }
}

// Line Chart
async function getRevenueOverTime() {
    try {
            const count = await mainModel.getRevenueOverTime();
            return count;
        } catch (error) {
            console.error("Error getting revenue over time:", error);
            return [];
        }
}

// Pie Chart
async function getBookingsByStatus() {
    try {
            const count = await mainModel.getBookingsByStatus();
            return count;
        } catch (error) {
            console.error("Error getting active booking count:", error);
            return [];
        }
}

module.exports = {
    getUserCount,
    getActiveBookingCount,
    getAllBookingPrices,
    getTodaysRevenue,

    getBookingsPerDay,
    getPeakParkingHours,
    getMostUsedParkingSpaces,
    getRevenueOverTime,
    getBookingsByStatus,
}