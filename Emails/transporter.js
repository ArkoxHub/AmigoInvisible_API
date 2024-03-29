const nodemailer = require('nodemailer');
require("dotenv").config();

let transporter = nodemailer.createTransport({
    // Create a SMTP transporter object
    service: 'gmail',
    host: process.env.HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    },
    pool: true,
    maxConnections: 100,
    maxMessages: Infinity
});

module.exports = transporter;