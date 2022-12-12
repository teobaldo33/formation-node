const mongoose = require("mongoose");


const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique:true
        },
        password: {
            type: String,
            required: true,
        },
        sessionID: {
            type:String
        }
    },
);

module.exports = mongoose.model("User", User);