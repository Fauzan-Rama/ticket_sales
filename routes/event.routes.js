
const express = require('express');

const app = express();

const eventController = require('../controllers/event.controller');

const { authorize } = require('../controllers/auth.controller');

const { IsAdmin } = require('../middlewares/role-validation');

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events retrieved successfully
 *       401:
 *         description: Unauthorized
 */
app.get("/", authorize, eventController.getAllEvent);

/**
 * @swagger
 * /event/search/{key}:
 *   get:
 *     summary: Search or filter events
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Matching events retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No matching events found
 */
app.get("/search/:key", authorize, eventController.findEvent);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Event]
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
 *         description: Event retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Event not found
 */
app.get("/:id", authorize, eventController.getEventByID);

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Add a new event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
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
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
app.post("/", authorize, IsAdmin, eventController.addEvent);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
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
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Event not found
 */
app.put("/:id", authorize, IsAdmin, eventController.updateEvent);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Event]
 *     security:
 *       - bearerAuth: []
 *     description: Admin access required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
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
app.delete("/:id", authorize, IsAdmin, eventController.deleteEvent);

module.exports = app;