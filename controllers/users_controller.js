const UserModel = require("../models/user");

module.exports.profile = function (request, response) {
    let locals = { "title": "Users Profile" };
    return response.render("user_profile", locals);
}

module.exports.userHome = function (request, response) {
    let locals = { "title": "Users Home" };
    return response.render("users", locals);
}

// render the sign up page
module.exports.signUp = function (request, response) {
    let locals = { "title": "Codial Home!" }
    return response.render("user_sign_up", locals);
};

module.exports.signIn = function (request, response) {
    let locals = { "title": "Codial Home!" }
    return response.render("user_sign_in", locals);
};

// Sign-Up user on Codial!
module.exports.createUser = function (request, response) {
    console.log(request.body);
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
            return response.send(newItem);
        }
    });

}

// Sign-In - create session for the user!
module.exports.createSession = function (request, response) {
    console.log(request.body);
    return response.send(request.body);
}


