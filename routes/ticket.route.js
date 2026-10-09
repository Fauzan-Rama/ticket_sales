
const express = require('express');

const app = express();

const ticketController = require('../controllers/ticket.controller');

const { authorize } = require('../controllers/auth.controller');

/**
 * @swagger
 * /ticket:
 *   post:
 *     summary: Create a new ticket
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
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
app.post("/", authorize, ticketController.addTicket);

/**
 * @swagger
 * /ticket:
 *   get:
 *     summary: Get all tickets
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/", authorize, ticketController.getAllTicket);

/**
 * @swagger
 * /ticket/my-tickets:
 *   get:
 *     summary: Get tickets belonging to the current user
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/my-tickets", authorize, ticketController.getMyTickets);

/**
 * @swagger
 * /ticket/sales-per-event:
 *   get:
 *     summary: Get ticket sales grouped by event
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Ticket sales statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/sales-per-event", authorize, ticketController.getSalesPerEvent);

/**
 * @swagger
 * /ticket/top5-events:
 *   get:
 *     summary: Get the top five active events by ticket sales
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Top five active events retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/top5-events", authorize, ticketController.getTop5ActiveEvents);

/**
 * @swagger
 * /ticket/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *     responses:
 *       200:
 *         description: Ticket retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Ticket not found
 */
app.get("/:id", authorize, ticketController.TicketByID);

/**
 * @swagger
 * /ticket/event/{id}:
 *   get:
 *     summary: Get tickets by event ID
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Tickets for the event retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event or tickets not found
 */
app.get("/event/:id", authorize, ticketController.TicketByeventID);

/**
 * @swagger
 * /ticket/userID/{id}:
 *   get:
 *     summary: Get tickets by user ID
 *     tags: [Ticket]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User tickets retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User or tickets not found
 */
app.get("/userID/:id", authorize, ticketController.ticketByuserID);

module.exports = app;