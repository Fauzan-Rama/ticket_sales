const diskonModel = require(`../models/index`).diskon
const Op = require(`sequelize`).Op

/** 1. GET ALL DISKON */
exports.getAllDiskon = async (request, response) => {
    try {
        let diskons = await diskonModel.findAll()
        return response.json({
            success: true,
            data: diskons,
            message: `All diskons have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 2. SEARCH / FIND DISKON */
exports.findDiskon = async (request, response) => {
    try {
        let keyword = request.params.key
        let diskons = await diskonModel.findAll({
            where: {
                [Op.or]: [
                    { diskonID: { [Op.substring]: keyword } },
                    { diskonname: { [Op.substring]: keyword } },
                    { nominal: { [Op.substring]: keyword } },
                    { tanggalberlaku: { [Op.substring]: keyword } }
                ]
            }
        })
        return response.json({
            success: true,
            data: diskons,
            message: `Diskon have been loaded`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 3. CREATE / ADD DISKON */
exports.addDiskon = async (request, response) => {
    try {
        let { diskonname, nominal, tanggalberlaku } = request.body
        let diskon = await diskonModel.create({
            diskonname,
            nominal,
            tanggalberlaku
        })
        return response.json({
            success: true,
            data: diskon,
            message: `Diskon have been added`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 4. UPDATE DISKON */
exports.updateDiskon = async (request, response) => {
    try {
        let diskonID = request.params.id
        let { diskonname, nominal, tanggalberlaku } = request.body

        let dataDiskon = {
            diskonname,
            nominal,
            tanggalberlaku
        }

        await diskonModel.update(dataDiskon, {
            where: { diskonID: diskonID }
        })

        return response.json({
            success: true,
            message: `Diskon have been updated`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}

/** 5. DELETE DISKON */
exports.deleteDiskon = async (request, response) => {
    try {
        let diskonID = request.params.id

        await diskonModel.destroy({
            where: { diskonID: diskonID }
        })

        return response.json({
            success: true,
            message: `Diskon have been deleted`
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        })
    }
}