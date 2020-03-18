// file for handling routes for /user
const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users_controller");


router.get("/", usersController.userHome);
router.get("/profile", usersController.profile);
router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);


router.post("/create", usersController.createUser);
router.post("/create-session", usersController.createSession);

module.exports = router;

