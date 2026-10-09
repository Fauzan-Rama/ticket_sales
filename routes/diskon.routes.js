const express = require("express");
const router = express.Router();

const diskonController = require("../controllers/diskon.controller");
const { authorize } = require("../controllers/auth.controller");
const { IsAdmin } = require("../middlewares/role-validation");
// const { validateDiskon } = require("../middlewares/diskon-validation"); // Hapus komentar ini jika file validasi diskon ada

router.get("/", authorize, diskonController.getAllDiskon);
router.get("/:key", authorize, diskonController.findDiskon);
router.post("/", authorize, IsAdmin, diskonController.addDiskon);
router.put("/:id", authorize, IsAdmin, diskonController.updateDiskon);
router.delete("/:id", authorize, IsAdmin, diskonController.deleteDiskon);

module.exports = router;