/** Creating Schema for user */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    }
},
    {
        timestamps: true  // manages two fields for us --> createdAt, updatedAt
    });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;