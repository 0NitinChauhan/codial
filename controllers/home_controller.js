const express = require("express");

module.exports.getHome = function (request, response) {
    let locals = { "title": "Codial Home" };

    console.log(request.cookies);
    response.cookie("user_id", 24);
    return response.render("home", locals);
}