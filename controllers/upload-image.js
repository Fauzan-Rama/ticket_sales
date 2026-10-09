/** load library 'multer' and 'path' */
const multer = require(`multer`)
const path = require(`path`)

/** storage configuration */
const storage = multer.diskStorage({
    /** define storage folder */
    destination: (req, file, cb) => {
        cb(null, `./image`)
    },

    /** define filename for upload file */
    filename: (req, file, cb) => {
        cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    /** storage configuration */
    storage: storage,

    /** limit file size (1MB) */
    limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB

    /** filter uploaded file */
    fileFilter: (req, file, cb) => {
        /** allowed extensions & mime types */
        const allowedTypes = /jpeg|jpg|png/
        
        // Cek ekstensi file (contoh: .png, .jpg)
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        
        // Cek mimetype (contoh: image/png, image/jpeg)
        const mimetype = allowedTypes.test(file.mimetype)

        // Izinkan jika mimetype cocok ATAU jika dikirim sebagai application/octet-stream selama ekstensinya gambar
        if ((mimetype && extname) || (file.mimetype === 'application/octet-stream' && extname)) {
            return cb(null, true)
        } else {
            return cb(new Error(`Invalid file type (${file.mimetype}). Only PNG, JPG, and JPEG are allowed!`))
        }
    }
})

module.exports = upload