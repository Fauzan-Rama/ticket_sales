
/** Load library Express */
const express = require('express');

/** Initiate Express app */
const app = express();

/** Allow JSON request body */
app.use(express.json());

/** Load authentication controller */
const { authenticate } = require('../controllers/auth.controller');

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     description: Login to obtain an authentication token.
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *             required:
 *               - username
 *               - password
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
app.post('/', authenticate);

/** Export app */
module.exports = app;