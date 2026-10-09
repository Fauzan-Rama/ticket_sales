const { Ongkir } = require('../models');
const { Op } = require('sequelize');

// GET /api/ongkir (Termasuk pencarian ?search=)
exports.getAllOngkir = async (req, res) => {
  try {
    const { search } = req.query;
    let whereCondition = {};

    if (search) {
      whereCondition = {
        [Op.or]: [
          { subdistrict_name: { [Op.like]: `%${search}%` } },
          { city: { [Op.like]: `%${search}%` } },
          { province: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const data = await Ongkir.findAll({ where: whereCondition });

    return res.status(200).json({
      success: true,
      message: "Data ongkir berhasil diambil",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data ongkir",
      error: error.message
    });
  }
};

// GET /api/ongkir/:id
exports.getOngkirById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Ongkir.findByPk(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Data ongkir tidak ditemukan"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Detail data ongkir berhasil diambil",
      data
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil detail ongkir",
      error: error.message
    });
  }
};

// POST /api/ongkir
exports.createOngkir = async (req, res) => {
  try {
    const {
      subdistrict_id,
      province_id,
      province,
      city_id,
      city,
      type,
      subdistrict_name
    } = req.body;

    const newData = await Ongkir.create({
      subdistrict_id,
      province_id,
      province,
      city_id,
      city,
      type,
      subdistrict_name
    });

    return res.status(201).json({
      success: true,
      message: "Data ongkir berhasil ditambahkan",
      data: newData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menambahkan data ongkir",
      error: error.message
    });
  }
};

// PUT /api/ongkir/:id
exports.updateOngkir = async (req, res) => {
  try {
    const { id } = req.params;
    const ongkir = await Ongkir.findByPk(id);

    if (!ongkir) {
      return res.status(404).json({
        success: false,
        message: "Data ongkir tidak ditemukan"
      });
    }

    await ongkir.update(req.body);

    return res.status(200).json({
      success: true,
      message: "Data ongkir berhasil diperbarui",
      data: ongkir
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal memperbarui data ongkir",
      error: error.message
    });
  }
};

// DELETE /api/ongkir/:id
exports.deleteOngkir = async (req, res) => {
  try {
    const { id } = req.params;
    const ongkir = await Ongkir.findByPk(id);

    if (!ongkir) {
      return res.status(404).json({
        success: false,
        message: "Data ongkir tidak ditemukan"
      });
    }

    await ongkir.destroy();

    return res.status(200).json({
      success: true,
      message: "Data ongkir berhasil dihapus"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal menghapus data ongkir",
      error: error.message
    });
  }
};