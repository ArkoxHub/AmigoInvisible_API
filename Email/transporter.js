const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // Create a SMTP transporter object
    host: process.env.HOST,
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;