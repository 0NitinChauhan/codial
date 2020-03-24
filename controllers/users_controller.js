const UserModel = require("../models/user");

module.exports.profile = function (request, response) {
    let locals = { "title": "Users Profile" };
    return response.render("user_profile", locals);
}

module.exports.userHome = function (request, response) {
    let locals = { "title": "Users Home" };
    return response.render("users", locals);
}

// render the sign up page - get
module.exports.signUp = function (request, response) {
    if (request.isAuthenticated()) {
        return response.redirect("/users/profile");
    }
    let locals = { "title": "Codial Home!" }
    return response.render("user_sign_up", locals);
};

// render the sign-in page - get
module.exports.signIn = function (request, response) {
    if (request.isAuthenticated()) {
        return response.redirect("/users/profile");
    }
    let locals = { "title": "Codial Home!" }
    return response.render("user_sign_in", locals);
};

// sign-out
module.exports.destroySession = function (request, response) {
    // passport gives 'logout()' function to request
    request.logout();
    return response.redirect("/");
}

// Sign-Up user on Codial - post
module.exports.createUser = function (request, response) {
    UserModel.findOne({ email: request.body.email }, function (err, user) {
        if (err) {
            console.log(`Error finding user for signing-up: ${err}`);
            return response.redirect("back");
        }
        if (!user) {
            // create the user in the DB
            UserModel.create({
                email: request.body.email,
                first_name: request.body.first_name,
                last_name: request.body.last_name,
                password: request.body.password
            }, function (error, newItem) {
                if (error) {
                    console.log("Failed to create DB entry");
                    response.status(400);
                    return response.send(error);
                }
                else {
                    console.log("Created new item: ", newItem);
                    return response.redirect("/users/sign-in");
                }
            });
        }
        else {
            return response.redirect("/users/sign-in");
        }
    });
}

// Sign-In - create session for the user - post
module.exports.createSession = function (request, response) {
    // session is created in Passport.js itself
    return response.redirect("/");
}


