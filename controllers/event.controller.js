/** load model for `events` table */
const eventModel = require(`../models/index`).event

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

/** load function from `upload-image` */
const upload = require(`./upload-image`).single(`image`)

/** 1. Read all data events */
exports.getAllEvent = async (request, response) => {
    try {
        let events = await eventModel.findAll()
        return response.json({
            success: true,
            data: events,
            message: `All Events have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 2. Get Single Event by ID (Eksak & Presisi) */
exports.getEventByID = async (request, response) => {
    try {
        let eventID = request.params.id
        
        // Ambil data tunggal berdasarkan Primary Key (eventID)
        let event = await eventModel.findByPk(eventID)

        if (!event) {
            return response.status(404).json({
                success: false,
                message: `Event with ID ${eventID} not found`
            })
        }

        return response.json({
            success: true,
            data: event,
            message: `Event data has been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 3. Search / Filter Event by Keyword */
exports.findEvent = async (request, response) => {
    try {
        let keyword = request.params.key

        let events = await eventModel.findAll({
            where: {
                [Op.or]: [
                    { eventName: { [Op.substring]: keyword } },
                    { venue: { [Op.substring]: keyword } }
                ]
            }
        })

        return response.json({
            success: true,
            data: events,
            message: `All matching events have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 4. Add new event */
exports.addEvent = (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ success: false, message: error })
        }

        if (!request.file) {
            return response.json({ success: false, message: `Nothing to Upload` })
        }

        let newEvent = {
            eventName: request.body.eventName,
            eventDate: request.body.eventDate,
            venue: request.body.venue,
            price: request.body.price,
            image: request.file.filename
        }

        eventModel.create(newEvent)
            .then(result => {
                return response.json({
                    success: true,
                    data: result,
                    message: `New event has been inserted`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

/** 5. Update event */
exports.updateEvent = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ success: false, message: error })
        }

        let eventID = request.params.id

        let dataEvent = {
            eventName: request.body.eventName,
            eventDate: request.body.eventDate,
            venue: request.body.venue,
            price: request.body.price,
        }

        if (request.file) {
            const selectedEvent = await eventModel.findOne({
                where: { eventID: eventID }
            })

            if (selectedEvent && selectedEvent.image) {
                const oldImage = selectedEvent.image
                const pathImage = path.join(__dirname, `../image`, oldImage)

                if (fs.existsSync(pathImage)) {
                    fs.unlink(pathImage, err => {
                        if (err) console.log(err)
                    })
                }
            }

            dataEvent.image = request.file.filename
        }

        eventModel.update(dataEvent, { where: { eventID: eventID } })
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data event has been updated`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

/** 6. Delete event */
exports.deleteEvent = async (request, response) => {
    try {
        const eventID = request.params.id

        const event = await eventModel.findOne({ where: { eventID: eventID } })

        if (!event) {
            return response.status(404).json({
                success: false,
                message: `Event not found`
            })
        }

        if (event.image) {
            const oldImage = event.image
            const pathImage = path.join(__dirname, `../image`, oldImage)

            if (fs.existsSync(pathImage)) {
                fs.unlink(pathImage, err => {
                    if (err) console.log(err)
                })
            }
        }

        await eventModel.destroy({ where: { eventID: eventID } })

        return response.json({
            success: true,
            message: `Data event has been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}