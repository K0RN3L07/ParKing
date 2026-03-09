const parkingSpacesModel = require("../models/parkingSpacesModel");

async function getAllParkingSpaces() {
    try {
        const parkingSpaces = await parkingSpacesModel.getAllParkingSpaces();
        return parkingSpaces;
    }
    catch (err) {
        console.log("Error getting parking spaces:", err);
        return [];
    }
}

module.exports = {
    getAllParkingSpaces
}