const User = require('../models/bookingModel');

async function getNewBooking(req, res) {
    try {
        res.render('newBooking', {
            user: req.session.user || null
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Hiba a foglalás oldal betöltésekor", success: false });
    }
}

async function getMyBookings(req, res) {
    try {
        let user_id = req.session.user?.id;

        if (!user_id) {
            return res.status(401).json({ msg: "Nincs bejelentkezve!", success: false });
        }

        const data = await User.getUserBookings(user_id);
        const statuses = await User.setStatuses(user_id);

        for (let i = 0; i < data.length; i++) {
            data[i]["parking_status"] = statuses[i]["parking_status"];
        }
        
        // Optionally render page, still could use JSON for popup
        res.render("myBookings", { bookings: data, user: req.session.user || null });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Hiba a foglalások lekérésekor", success: false });
    }
}

async function bookSlot(req, res) {
    try {
        const user_id = req.session.user?.id;
        if (!user_id) {
            return res.status(401).json({ msg: "Nincs bejelentkezve!", success: false });
        }

        let { parking_slot, start_date, start_time, end_date, end_time, plate_num, total_cost } = req.body;

        if (!start_date) {
            return res.status(400).json({ msg: "Kezdő dátum megadása kötelező!", success: false });
        }

        if (!start_time) {
            return res.status(400).json({ msg: "Kezdő időpont megadása kötelező!", success: false });
        }

        if (!end_date) {
            return res.status(400).json({ msg: "Vég dátum megadása kötelező!", success: false });
        }

        if (!end_time) {
            return res.status(400).json({ msg: "Vég időpont megadása kötelező!", success: false });
        }

        if (!plate_num) {
            return res.status(400).json({ msg: "Rendszám megadása kötelező!", success: false });
        }
        
        if (parking_slot.split(';')[1] === null) {
            return res.status(400).json({ msg: "Parkolóhely megadása kötelező!", success: false });
        }

        let parking_space_id = await User.getParkingSpaceId(parking_slot.split(';')[0], parking_slot.split(';')[1]);
        if (!parking_space_id || parking_space_id.length === 0) {
            return res.status(404).json({ msg: "Parkolóhely nem található!", success: false });
        }

        parking_space_id = parking_space_id[0].id;
        let start = start_date + " " + start_time;
        let end = end_date + " " + end_time;

        await User.addBooking(user_id, parking_space_id, start, end, total_cost, plate_num.toUpperCase());

        return res.status(200).json({ msg: "Sikeres foglalás!", success: true });
    } catch (err) {
        return res.status(500).json({ msg: "Foglalás sikertelen!", success: false });
    }
}

async function getAllReservedOnFloor(req, res) {
    try {
        let { parking_slot, start_date, start_time, end_date, end_time } = req.body;

        if (!parking_slot || !start_date || !start_time || !end_date || !end_time) {
            return res.status(400).json({ msg: "Hiányos adatok!", success: false });
        }

        let start = start_date + " " + start_time + ":00";
        let end = end_date + " " + end_time + ":00";
        let floor = parking_slot.split(';')[0];

        let reservedSpots = await User.getAllReservedOnFloor(floor, start, end);

        return res.status(200).json({ reservedSpots, msg: "Foglalások lekérve", success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Hiba a foglalások lekérésekor", success: false });
    }
}

async function deleteBooking(req, res) {
    try {
        await User.deleteById(req.params.id);
        return res.status(200).json({ msg: "Sikeres törlés!", success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "A törlés sikertelen!", success: false });
    }
}

async function getParkingSpaceTypeAndPrice(req, res) {
    try {
        const { parking_slot } = req.body;
        if (!parking_slot) {
            return res.status(400).json({ msg: "Hiányos adatok!", success: false });
        }

        const [floor, slot] = parking_slot.split(';');
        const idResult = await User.getParkingSpaceId(floor, slot);

        if (!idResult || idResult.length === 0) {
            return res.status(404).json({ msg: "Parkolóhely nem található!", success: false });
        }

        const parking_space_id = idResult[0].id;
        const result = await User.getParkingSpaceTypeAndPrice(parking_space_id);

        if (!result || result.length === 0) {
            return res.status(404).json({ msg: "Adatok nem találhatók", success: false });
        }

        return res.status(200).json({ ...result[0], msg: "Adatok lekérve", success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Hiba a lekéréskor", success: false });
    }
}

async function setStatuses(req, res) {
    try {
        const results = await User.setStatuses();

        if (!results || results.length === 0) {
            return res.status(404).json({ msg: "Nincsenek foglalások", success: false });
        }

        return res.status(200).json({ results, msg: "Státuszok lekérve", success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Hiba a státuszok lekérésekor", success: false });
    }
}

module.exports = {
    getNewBooking,
    getMyBookings,
    bookSlot,
    getAllReservedOnFloor,
    deleteBooking,
    getParkingSpaceTypeAndPrice,
    setStatuses
};
