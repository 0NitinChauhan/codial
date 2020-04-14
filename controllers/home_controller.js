const express = require("express");
const PostsModel = require("../models/post");

module.exports.getHome = function (request, response) {
  let locals = { title: "Codial Home" };

  // Populate the user for each post callback will be executed by 'exec'
  PostsModel.find({})
    .populate("User")
    .exec(function (err, allPosts) {
      if (err) {
        console.log(`Error querying DB for posts data: ${err}`);
      }
      locals.posts = allPosts;
      console.log(allPosts);
      return response.render("home", locals);
    });
};

module.exports.getChat = function (request, response) {
  let locals = { title: "Codial Home" };

  // Populate the user for each post callback will be executed by 'exec'
  return response.render("chat-window", locals);
};
