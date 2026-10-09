
const express = require('express');
const app = express();

const seatController = require('../controllers/seat.controller');
const { authorize } = require('../controllers/auth.controller');
const { IsAdmin } = require('../middlewares/role-validation');

// GET all seats
/**
 * @swagger
 * /seat:
 *   get:
 *     summary: Get all seats
 *     tags: [Seat]
 *     responses:
 *       200:
 *         description: Seats retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/', authorize, seatController.getAllSeats);

// Find seat by key
/**
 * @swagger
 * /seat/{key}:
 *   get:
 *     summary: Find seat by key
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Seat not found
 */
app.get('/:key', authorize, seatController.findSeat);

// Add seat (Admin only)
/**
 * @swagger
 * /seat:
 *   post:
 *     summary: Add a new seat
 *     tags: [Seat]
 *     description: Admin access required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Seat created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.post('/', authorize, IsAdmin, seatController.addSeat);

// Update seat (Admin only)
/**
 * @swagger
 * /seat/{id}:
 *   put:
 *     summary: Update a seat
 *     tags: [Seat]
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Seat updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Seat not found
 */
app.put('/:id', authorize, IsAdmin, seatController.updateSeat);

// Delete seat (Admin only)
/**
 * @swagger
 * /seat/{id}:
 *   delete:
 *     summary: Delete a seat
 *     tags: [Seat]
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Seat not found
 */
app.delete('/:id', authorize, IsAdmin, seatController.deleteSeat);

// Get seats by event ID
/**
 * @swagger
 * /seat/event/{eventID}:
 *   get:
 *     summary: Get seats by event ID
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: eventID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event seats retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event or seats not found
 */
app.get('/event/:eventID', authorize, seatController.getSeatByEvent);

// Update seat status
/**
 * @swagger
 * /seat/status/{id}:
 *   put:
 *     summary: Update seat status
 *     tags: [Seat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Seat status updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Seat not found
 */
app.put('/status/:id', authorize, seatController.updateSeatStatus);

module.exports = app;