const express = require("express");

module.exports.getHome = function (request, response) {
    let locals = { "title": "Codial Home" };

    console.log(request.cookies);
    return response.render("home", locals);
}