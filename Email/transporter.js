const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // Create a SMTP transporter object
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'sorteo@amigoinvisible.net',
        pass: 'ipgglwfqastjpbat'
    },
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = transporter;