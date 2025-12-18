const User = require('../models/bookingModel');

async function getNewBooking(req, res) {
    res.render('newBooking', {
        user: req.session.user || null
    });
}

async function getMyBookings(req, res) {
    let user_id = req.session.user?.id;

    const data = await User.getUserBookings(user_id);

    res.render("myBookings", { bookings: data, user: req.session.user || null });
}

async function bookSlot(req, res) {
    const user_id = req.session.user?.id;

    if (!user_id) {
        return res.status(401).json({ error: "Nincs bejelentkezve!" });
    }

    let {
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
            plate_num.toUpperCase());

        return res.redirect('/myBookings');

        // res.status(200).json({ msg: "Sikeres foglalás!" })
    }
}

async function getAllReservedOnFloor(req, res) {
    let { parking_slot, start_date, start_time, end_date, end_time } = req.body;

    let start = (start_date + " " + start_time + ":00").toString();
    let end = (end_date + " " + end_time + ":00").toString();

    let floor = parking_slot.split(';')[0];

    let reservedSpots = await User.getAllReservedOnFloor(floor, start, end);

    res.status(200).json({ reservedSpots: reservedSpots });
}

async function deleteBooking(req, res) {
    try {
        await User.deleteById(req.params.id);
        res.status(204).json({msg: "Sikeres törlés!"});

    } catch (err) {
        res.status(500).json({ error: "A törlés sikertelen!" });
    }
}

async function getParkingSpaceTypeAndPrice(req, res) {
    try {
        const { parking_slot } = req.body;

        const [floor, slot] = parking_slot.split(';');

        const idResult = await User.getParkingSpaceId(floor, slot);

        if (!idResult || idResult.length === 0) {
            return res.status(404).json({ error: "Parking space not found" });
        }

        const parking_space_id = idResult[0].id;

        const result = await User.getParkingSpaceTypeAndPrice(parking_space_id);

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "No data found" });
        }

        res.status(200).json(result[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    getNewBooking,
    getMyBookings,
    bookSlot,
    getAllReservedOnFloor,
    deleteBooking,
    getParkingSpaceTypeAndPrice
}