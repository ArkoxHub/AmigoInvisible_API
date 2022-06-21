const mongoose = require("mongoose");

let draw = new mongoose.Schema({
    drawID: String,
    title: String,
    price: String,
    date: Date,
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
    date: String,
    sent: Boolean,
});


module.exports = mongoose.model('draw', draw);