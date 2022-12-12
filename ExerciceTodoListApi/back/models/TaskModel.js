const mongoose = require("mongoose");


const Task = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
            maxlength: 30,
        },
        corps: {
            type: String,
            required: true,
            maxlength: 30,
        },
        importance: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        statut: {
            type: Number,
            required: true,
            maxlength: 30,
        },
    },
);

module.exports = mongoose.model("Task", Task);