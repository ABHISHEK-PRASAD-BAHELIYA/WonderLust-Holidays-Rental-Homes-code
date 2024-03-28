const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.renderSignupFoam)
    .post( 
        wrapAsync(userController.signup)
    );

//login
router
    .route("/login")
    .get(userController.renderLoginFoam)
    .post(
        saveRedirectUrl, 
        passport.authenticate("local",  { 
            failureRedirect: '/login', 
            failureFlash: true, 
        }),
        userController.login 
    );

router.get("/logout", userController.logout);

module.exports = router;