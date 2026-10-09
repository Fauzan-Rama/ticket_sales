
const seatModel = require(`../models/index`).seat
const Op = require(`sequelize`).Op

// 1. Get All Seats
exports.getAllSeats = async (request, response) => {
    try {
        let seats = await seatModel.findAll()
        return response.json({
            success: true,
            data: seats,
            message: `All seats have been loaded`
        })
    } catch (error) {
        return response.json({ success: false, message: error.message })
    }
}

// 2. Find Seats (Filter Berdasarkan Key)
exports.findSeat = async (request, response) => {
    let keyword = request.params.key
    try {
        let seats = await seatModel.findAll({
            where: {
                [Op.or]: [
                    { rowNum: { [Op.substring]: keyword } },
                    { seatNum: { [Op.substring]: keyword } },
                    { eventID: { [Op.substring]: keyword } }
                ]
            }
        })
        return response.json({
            success: true,
            data: seats,
            message: `Seats matching keyword loaded`
        })
    } catch (error) {
        return response.json({ success: false, message: error.message })
    }
}

// 3. Add Seat
exports.addSeat = (request, response) => {
    let newSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    seatModel.create(newSeat)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `New seat record has been inserted`
            })
        })
        .catch(error => {
            return response.json({ success: false, message: error.message })
        })
}

// 4. Update Seat
exports.updateSeat = (request, response) => {
    let seatID = request.params.id
    let dataSeat = {
        eventID: request.body.eventID,
        rowNum: request.body.rowNum,
        seatNum: request.body.seatNum,
        status: request.body.status
    }

    seatModel.update(dataSeat, { where: { seatID: seatID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Seat data has been updated`
            })
        })
        .catch(error => {
            return response.json({ success: false, message: error.message })
        })
}

// 5. Delete Seat
exports.deleteSeat = (request, response) => {
    let seatID = request.params.id

    seatModel.destroy({ where: { seatID: seatID } })
        .then(result => {
            return response.json({
                success: true,
                message: `Seat data has been deleted`
            })
        })
        .catch(error => {
            return response.json({ success: false, message: error.message })
        })
}
exports.getSeatByEvent = async (req, res) => {
    try {
        let eventID = req.params.eventID

        // Ambil semua seat yang eventID-nya cocok
        let seats = await seatModel.findAll({
            where: { eventID: eventID }
        })

        return res.json({
            success: true,
            data: seats,
            message: `Daftar kursi untuk Event ID ${eventID} berhasil dimuat`
        })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
exports.updateSeatStatus = async (req, res) => {
    try {
        let seatID = req.params.id

        let dataUpdate = {
            status: req.body.status
        }

        await seatModel.update(dataUpdate, {
            where: { seatID: seatID }
        })

        return res.json({
            success: true,
            message: `Status kursi ID ${seatID} berhasil diperbarui`
        })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}