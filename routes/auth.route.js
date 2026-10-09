
/** load library express */
const express = require(`express`);

/** initiate object that instance of express */
const app = express();

/** allow to read 'request' with json type */
app.use(express.json());

/** load function authentication from auth's controller */
const { authenticate } = require(`../controllers/auth.controller`);

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate a user and return the authentication result.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
app.post(`/`, authenticate);

/** export app in order to load in another file */
module.exports = app;