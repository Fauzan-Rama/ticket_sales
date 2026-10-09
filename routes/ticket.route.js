
const express = require('express');
const app = express();

const ticketController = require('../controllers/ticket.controller');
const { authorize } = require('../controllers/auth.controller');

// POST create ticket
/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Ticket created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
app.post('/', authorize, ticketController.addTicket);

// GET all tickets
/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: Tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/', authorize, ticketController.getAllTicket);

// GET tickets belonging to current user
/**
 * @swagger
 * /ticket/my-tickets:
 *   get:
 *     summary: Get my tickets
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: User tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/my-tickets', authorize, ticketController.getMyTickets);

// GET sales per event
/**
 * @swagger
 * /ticket/sales-per-event:
 *   get:
 *     summary: Get ticket sales per event
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: Ticket sales statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/sales-per-event', authorize, ticketController.getSalesPerEvent);

// GET top five active events
/**
 * @swagger
 * /ticket/top5-events:
 *   get:
 *     summary: Get top five active events
 *     tags: [Ticket]
 *     responses:
 *       200:
 *         description: Top five active events retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/top5-events', authorize, ticketController.getTop5ActiveEvents);

// GET ticket by ID
/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */
app.get('/:id', authorize, ticketController.TicketByID);

// GET tickets by event ID
/**
 * @swagger
 * /ticket/event/{id}:
 *   get:
 *     summary: Get tickets by event ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event or tickets not found
 */
app.get('/event/:id', authorize, ticketController.TicketByeventID);

// GET tickets by user ID
/**
 * @swagger
 * /ticket/userID/{id}:
 *   get:
 *     summary: Get tickets by user ID
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or tickets not found
 */
app.get('/userID/:id', authorize, ticketController.ticketByuserID);

module.exports = app;