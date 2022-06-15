const mongoose = require("mongoose");

let draw = new mongoose.Schema({
    drawID: String,
    name: String,
    price: String,
    date: Date,
    comments: String,
    participants: [
        {
            participantID: Number,
            name: String,
            email: String,
            exclude: [String],
            wishlist: [String],
            result: String,
            errors: [String]
        }
    ],
    date: String,
    sent: Boolean,
});


module.exports = mongoose.model('draw', draw);