const mongoose = require("mongoose");

let draw = new mongoose.Schema({
    drawID: String,
    title: String,
    price: String,
    date: String,
    comments: String,
    host: String,
    participants: [
        {
            participantID: Number,
            name: String,
            email: String,
            exclude: [String],
            wishlist: [String],
            result: String,
            errorsLog: [String]
        }
    ],
    dateRegistration: Date,
    sent: Boolean,
});


module.exports = mongoose.model('draw', draw);