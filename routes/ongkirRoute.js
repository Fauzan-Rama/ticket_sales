
const express = require('express');
const router = express.Router();

const ongkirController = require('../controllers/ongkirController');

// GET all shipping costs
/**
 * @swagger
 * /ongkir:
 *   get:
 *     summary: Get all shipping costs
 *     tags: [Ongkir]
 *     security: []
 *     responses:
 *       200:
 *         description: Shipping costs retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/', ongkirController.getAllOngkir);

// GET shipping cost by ID
/**
 * @swagger
 * /ongkir/{id}:
 *   get:
 *     summary: Get shipping cost by ID
 *     tags: [Ongkir]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping cost retrieved successfully
 *       404:
 *         description: Shipping cost not found
 */
router.get('/:id', ongkirController.getOngkirById);

// POST new shipping cost
/**
 * @swagger
 * /ongkir:
 *   post:
 *     summary: Create a shipping cost
 *     tags: [Ongkir]
 *     security: []
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

// PUT update shipping cost
/**
 * @swagger
 * /ongkir/{id}:
 *   put:
 *     summary: Update a shipping cost
 *     tags: [Ongkir]
 *     security: []
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
 *         description: Shipping cost updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Shipping cost not found
 */
router.put('/:id', ongkirController.updateOngkir);

// DELETE shipping cost
/**
 * @swagger
 * /ongkir/{id}:
 *   delete:
 *     summary: Delete a shipping cost
 *     tags: [Ongkir]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shipping cost deleted successfully
 *       404:
 *         description: Shipping cost not found
 */
router.delete('/:id', ongkirController.deleteOngkir);

module.exports = router;