const express = require('express');
const router = express.Router();
const ongkirController = require('../controllers/ongkirController');

// Gunakan '/' karena prefix /ongkir sudah dipasang di index.js
router.get('/', ongkirController.getAllOngkir);
router.get('/:id', ongkirController.getOngkirById);
router.post('/', ongkirController.createOngkir);
router.put('/:id', ongkirController.updateOngkir);
router.delete('/:id', ongkirController.deleteOngkir);

module.exports = router;