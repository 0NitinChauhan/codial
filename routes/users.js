// file for handling routes for /user
const express = require("express");
const router = express.Router();
const passport = require("passport");

const usersController = require("../controllers/users_controller");


router.get("/", passport.checkAuthentication, usersController.userHome);
router.get("/profile", passport.checkAuthentication, usersController.profile);
router.get("/sign-in", usersController.signIn);
router.get("/sign-up", usersController.signUp);
router.get("/sign-out", usersController.destroySession);


router.post("/create", usersController.createUser);

// use passport as a middleware to authenticate
/**
 * Post request to sign-in
 * Passport first authenticates it --> 
 *  if authentication fails --> redirect to "/users/sign-in page"
 * else --> invoke the createSession controller
 */
router.post("/create-session", passport.authenticate(
    "local",
    { failureRedirect: "/users/sign-in" }),
    usersController.createSession);

module.exports = router;



