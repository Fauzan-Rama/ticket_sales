const sequelize = require('../models/index').sequelize;
const seatModel = require(`../models/index`).seat;
const userModel = require(`../models/index`).user;
const eventModel = require(`../models/index`).event;
const ticketModel = require(`../models/index`).ticket;

const Op = require(`sequelize`).Op;

/** create function for add new ticket */
exports.addTicket = async (request, response) => {
    /** prepare date for bookedDate */
    const today = new Date();
    const bookedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    /** prepare data from request */
    const { eventID, userID, seats } = request.body;

    try {
        // Create seat records for the chosen seats
        const seatIDs = await Promise.all(seats.map(async seat => {
            const { rowNum, seatNum } = seat;
            const createdSeat = await seatModel.create({
                eventID,
                rowNum,
                seatNum,
                status: 'true'
            });
            return createdSeat.seatID;
        }));

        // Create ticket records associating the chosen seats
        const tickets = await ticketModel.bulkCreate(seatIDs.map(seatID => ({
            eventID,
            userID,
            seatID,
            bookedDate
        })));

        response.status(201).json(tickets);
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

/** FUNGSI GET ALL TICKET (Diperbarui dengan role check & filter user) */
exports.getAllTicket = async (request, response) => {
    try {
        // Ambil data user dari token JWT yang sudah di-decode middleware authorize
        const currentUser = request.user;

        // Ambil userID dengan aman (mendukung request.user.userID atau request.user.userID / request.user.id)
        const currentUserID = currentUser.userID || currentUser.id;

        let tickets;

        // Cek jika yang login adalah Admin
        if (currentUser.role === 'admin') {
            // Admin: Tampilkan semua tiket dari seluruh user
            tickets = await ticketModel.findAll({
                include: [
                    { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
                    { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
                    { model: seatModel, attributes: ['rowNum', 'seatNum'] }
                ]
            });
        } else {
            // User Biasa: Tampilkan HANYA tiket milik user yang sedang login
            tickets = await ticketModel.findAll({
                where: {
                    userID: currentUserID
                },
                include: [
                    { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
                    { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
                    { model: seatModel, attributes: ['rowNum', 'seatNum'] }
                ]
            });
        }

        return response.json({
            success: true,
            data: tickets,
            message: `All tickets have been loaded`
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/** create function for filter ticket by ID */
exports.TicketByID = async (request, response) => {
    let ticketID = request.params.id;

    let tickets = await ticketModel.findAll({
        where: {
            ticketID: { [Op.substring]: ticketID }
        },
        include: [
            { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
            { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
            { model: seatModel, attributes: ['rowNum', 'seatNum'] }
        ]
    });
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    });
};

exports.TicketByeventID = async (request, response) => {
    let eventID = request.params.id;

    let tickets = await ticketModel.findAll({
        where: {
            eventID: { [Op.substring]: eventID }
        },
        include: [
            { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
            { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
            { model: seatModel, attributes: ['rowNum', 'seatNum'] }
        ]
    });
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    });
};

exports.ticketByuserID = async (request, response) => {
    let userID = request.params.id;

    let tickets = await ticketModel.findAll({
        where: {
            userID: { [Op.substring]: userID }
        },
        include: [
            { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
            { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
            { model: seatModel, attributes: ['rowNum', 'seatNum'] }
        ]
    });
    return response.json({
        success: true,
        data: tickets,
        message: `All tickets have been loaded`
    });
};

// 1. Tampilkan daftar tiket user yang sedang login
exports.getMyTickets = async (request, response) => {
    try {
        let userID = request.user.userID || request.user.id;

        let tickets = await ticketModel.findAll({
            where: { userID: userID },
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] },
                { model: userModel, attributes: ['firstName', 'lastName', 'email'] },
                { model: seatModel, attributes: ['rowNum', 'seatNum'] }
            ]
        });

        return response.json({
            success: true,
            data: tickets,
            message: `Tiket user berhasil dimuat`
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};

// 2. Tampilkan jumlah tiket yang terjual untuk masing-masing event
exports.getSalesPerEvent = async (request, response) => {
    try {
        let sales = await ticketModel.findAll({
            attributes: [
                'eventID',
                [sequelize.fn('COUNT', sequelize.col('ticket.ticketID')), 'totalTerjual']
            ],
            include: [
                { model: eventModel, attributes: ['eventName', 'eventDate', 'venue'] }
            ],
            group: ['ticket.eventID', 'event.eventID']
        });

        return response.json({
            success: true,
            data: sales,
            message: `Data penjualan tiket per event berhasil dimuat`
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};

// 3. Tampilkan 5 event dengan penjualan terbanyak (yang belum/sedang berlangsung)
exports.getTop5ActiveEvents = async (request, response) => {
    try {
        const today = new Date();

        let topEvents = await ticketModel.findAll({
            attributes: [
                'eventID',
                [sequelize.fn('COUNT', sequelize.col('ticket.ticketID')), 'totalTerjual']
            ],
            include: [
                {
                    model: eventModel,
                    attributes: ['eventName', 'eventDate', 'venue'],
                    where: {
                        eventDate: { [Op.gte]: today }
                    }
                }
            ],
            group: ['ticket.eventID', 'event.eventID'],
            order: [[sequelize.literal('totalTerjual'), 'DESC']],
            limit: 5
        });

        return response.json({
            success: true,
            data: topEvents,
            message: `Top 5 event terlaris berhasil dimuat`
        });
    } catch (error) {
        return response.status(500).json({ success: false, message: error.message });
    }
};