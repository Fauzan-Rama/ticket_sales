
const express = require('express');
const app = express();

const eventController = require('../controllers/event.controller');
const { authorize } = require('../controllers/auth.controller');
const { IsAdmin } = require('../middlewares/role-validation');

// GET all events
/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get('/', authorize, eventController.getAllEvent);

// Search events
/**
 * @swagger
 * /event/search/{key}:
 *   get:
 *     summary: Search or filter events
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching events retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No matching events found
 */
app.get('/search/:key', authorize, eventController.findEvent);

// GET event by ID
/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Event]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
app.get('/:id', authorize, eventController.getEventByID);

// POST new event (Admin only)
/**
 * @swagger
 * /event:
 *   post:
 *     summary: Add a new event
 *     tags: [Event]
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
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.post('/', authorize, IsAdmin, eventController.addEvent);

// PUT update event (Admin only)
/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Event]
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
 *         description: Event updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 */
app.put('/:id', authorize, IsAdmin, eventController.updateEvent);

// DELETE event (Admin only)
/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Event]
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 */
app.delete('/:id', authorize, IsAdmin, eventController.deleteEvent);

module.exports = app;