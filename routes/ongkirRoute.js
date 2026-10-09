
const express = require('express');

const router = express.Router();

const ongkirController = require('../controllers/ongkirController');

// Gunakan '/' karena prefix /ongkir sudah dipasang di index.js

/**
 * @swagger
 * /ongkir:
 *   get:
 *     summary: Get all shipping costs
 *     tags: [Ongkir]
 *     responses:
 *       200:
 *         description: List of shipping costs retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', ongkirController.getAllOngkir);

/**
 * @swagger
 * /ongkir/{id}:
 *   get:
 *     summary: Get shipping cost by ID
 *     tags: [Ongkir]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shipping cost ID
 *     responses:
 *       200:
 *         description: Shipping cost retrieved successfully
 *       404:
 *         description: Shipping cost not found
 */
router.get('/:id', ongkirController.getOngkirById);

/**
 * @swagger
 * /ongkir:
 *   post:
 *     summary: Create a shipping cost
 *     tags: [Ongkir]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       201:
 *         description: Shipping cost created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', ongkirController.createOngkir);

/**
 * @swagger
 * /ongkir/{id}:
 *   put:
 *     summary: Update a shipping cost
 *     tags: [Ongkir]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shipping cost ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Shipping cost updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Shipping cost not found
 */
router.put('/:id', ongkirController.updateOngkir);

/**
 * @swagger
 * /ongkir/{id}:
 *   delete:
 *     summary: Delete a shipping cost
 *     tags: [Ongkir]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Shipping cost ID
 *     responses:
 *       200:
 *         description: Shipping cost deleted successfully
 *       404:
 *         description: Shipping cost not found
 */
router.delete('/:id', ongkirController.deleteOngkir);

module.exports = router;