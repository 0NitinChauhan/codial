const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // refer to Object Id of user
        ref: 'UserModel'              // name of the model to refer to
    }
},
    {
        timestamps: true  // manages two fields for us --> createdAt, updatedAt
    });

const PostModel = mongoose.model("Post", postSchema);
module.exports = PostModel;