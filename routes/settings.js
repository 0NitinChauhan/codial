const express = require("express");
const router =  express.Router();
const settingsController = require("../controllers/setting_controller");

router.get("/", settingsController.settings);

module.exports = router;