// CONTROLER RECEIVES DRAW REQUEST FROM CLIENT
const Draw = require('../Models/Draw');
const crypto = require('crypto')

// Email
const transporter = require('../Emails/transporter');
var handlebarOptions = require('../Emails/handlebarOptions');
var hbs = require('nodemailer-express-handlebars');
var mailOptions = require('../Emails/mailOptions');

let controller = {
    getUserResult: function (req, res) {
        try {
            let drawRequest = req.params;
            console.log(drawRequest);

            return res.status(200).json({
                message: 'Draw request received',
            })
        } catch (error) {
            return res.status(500).json({
                message: "Error enviando los correos"
            })
        }
    },

    // METHOD TO SEND MAILS
    sendEmails: function (req, res) {
        try {
            // Get request data
            let drawRequest = req.body;
            const draw = new Draw({
                drawID: crypto.randomUUID(),
                title: drawRequest.name,
                price: drawRequest.price,
                date: getCurrentDate(),
                comments: drawRequest.comments,
                participants: drawRequest.participants,
                sent: false
            });

            // Save draw in database
            draw.save();

            transporter.use('compile', hbs(handlebarOptions));

            draw.participants.forEach(participant => {
                // Send the email
                transporter.sendMail(mailOptions(participant.email, draw.title, participant.name, draw.date, draw.price, draw.comments, 
                    "www.amigoinvisible.net"), (err, info) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Error",
                            error: err
                        })
                    } else {
                        return res.status(200).json({
                            message: 'Success',
                            info: info
                        })
                    }
                })
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error en el servidor al intentar enviar los correos a los participantes. Por favor intente de nuevo más tarde."
            })
        }
    },
}

// Function to get current date dd/mm/yyyy
function getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    return day + '/' + month + '/' + year;
}


// EXPORT CONTROLLER
module.exports = controller;

