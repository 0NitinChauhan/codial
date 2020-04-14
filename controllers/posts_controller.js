const PostModel = require("../models/post");

module.exports.create = function (request, response) {
    PostModel.create({
        content: request.body.content,
        user: request.user._id
    }, function (err, newPost) {
        if (err) {
            console.log(`Error in creating a post: ${err}`);
            return response.redirect("back");
        }

    })
    return response.redirect("back");
}