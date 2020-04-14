const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const passport = require("passport");

// Import Controllers
const homeController = require("../controllers/home_controller");
const userController = require("../controllers/users_controller");

console.log("Router loaded");

router.use(express.urlencoded());

router.get("/", passport.checkAuthentication, homeController.getHome); // any request that start with / and doesn't have users will go to homeController
router.get("/ehe-chat", passport.checkAuthentication, homeController.getChat);

router.use("/users", require("./users")); // this route handles all requests for /users
router.use("/settings", require("./settings"));
router.use("/posts", require("./posts"));

module.exports = router;
