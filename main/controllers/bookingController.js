const User = require('../models/bookingModel');

async function getNewBooking(req, res) {
    res.render('newBooking', {
        user: req.session.user || null
    });
}

async function getMyBookings(req, res) {
    let user_id = req.session.user?.id;
    
    const data = await User.getUserBookings(user_id);
    
    res.render("myBookings", {bookings: data, user: req.session.user || null});
}

async function bookSlot(req, res) {
    const user_id = req.session.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Nincs bejelentkezve!" });
    }

    const {
        parking_slot,
        start_date,
        start_time,
        end_date,
        end_time,
        plate_num
    } = req.body;

    let parking_space_id = await User.getParkingSpaceId(parking_slot.split(';')[0], parking_slot.split(';')[1]);
    parking_space_id = parking_space_id[0].id;

    let start = start_date + " " + start_time;
    let end = end_date + " " + end_time;
    if (
        !user_id ||
        !parking_space_id ||
        !start_date ||
        !start_time ||
        !end_date ||
        !end_time ||
        !plate_num
    ) {
        res.status(400).json({ error: "Hiányos adatok!" });
    }
    else {
        await User.addBooking(
            user_id,
            parking_space_id,
            start,
            end,
            plate_num)

        res.status(200).json({ msg: "Sikeres foglalás!" })
    }
}

async function getAllReservedOnFloor(req, res) {
    let { parking_slot } = req.body;
    let floor = parking_slot.split(';')[0]

    let reservedSpots = await User.getAllReservedOnFloor(floor)

    res.status(200).json({reservedSpots: reservedSpots})
}

module.exports = {
    getNewBooking,
    getMyBookings,
    bookSlot,
    getAllReservedOnFloor
}