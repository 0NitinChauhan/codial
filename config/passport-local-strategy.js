const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");


// authentication using passport

// tell Passport to use LocalStrategy
passport.use(new LocalStrategy({
    // usernameField given by passport --> this is "email" in our schema
    usernameField: "email"
},
    function (email, password, done) {

        // find a user and establish identity
        UserModel.findOne({ "email": email }, function (err, user) {
            if (err) {
                console.log(`Error in finding user --> Passport: ${err}`)
                // report error to passport
                return done(err);
            }
            // If user is not found OR if the password is incorrect
            if (!user || user.password != password) {
                console.log("Invalid Username / Password");
                return done(null, false);
            }
            // If user is found and password is correct!
            return done(null, user);
        });
    }
));



/**
 * serializing the user --> using user.id and setting it in cookies
 */
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

/**
 * deserializing the user from the key in the cookies
 */
passport.deserializeUser(function (token, done) {
    UserModel.findById(token, function (err, user) {
        if (err) {
            console.log(`Error in finding user --> Passport: ${err}`);
        }

        if (!user) {
            console.log("User not found");
            return done(null, false);
        }

        return done(null, user);
    });
});




// check if user is authenticated --> this function will be used as a middleware
// passport puts a method in the request object --> isAuthenticated()
passport.checkAuthentication = function (request, response, next) {
    // if user is signed-in ==> pass on the request to the next function
    if (request.isAuthenticated()) {
        return next();
    }

    // if user is not signed-in --> redirect to sign-in page
    return response.redirect("/users/sign-in");
}

/**
 * Whenever as user sign-in, the user's information is available in request.user
 * (courtesy of passport)
 * We should set it on response as well
 */
passport.setAuthenticatedUser = function (request, response, next) {
    if (request.isAuthenticated()) {
        console.log("REQUEST USER IS", request.user);
        response.locals.user = request.user;
    }
    return next();
}

module.exports = passport;

