// CONTROLER RECEIVES DRAW REQUEST FROM CLIENT
const Draw = require('../Models/Draw');
const crypto = require('crypto')

const resultLink = 'https://www.amigoinvisible.net/resultado/'

// Email
const transporter = require('../Emails/transporter');
var handlebarOptions = require('../Emails/handlebarOptions');
var hbs = require('nodemailer-express-handlebars');
var mailOptions = require('../Emails/mailOptions');

let controller = {
    // GET USER PARTICIPANT
    getUserData: function (req, res) {
        try {
            const id = req.params.id

            // Get draw.participant by id
            Draw.findOne({ 'participants._id': id }, { "participants.$": 1 }, function (err, draw) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: 'Error en el servidor' });
                } else {
                    if (draw) {
                        res.status(200).send(draw);
                    } else {
                        res.status(200).send({ message: 'Participante no encontrado' });
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Error obteniendo el participante' });
        }
    },

    // METHOD TO SEND MAILS
    sendEmails: async function (req, res) {
        try {
            // Get request data
            let drawRequest = req.body;

            const draw = new Draw({
                drawID: crypto.randomUUID(),
                title: drawRequest.name,
                price: drawRequest.price,
                date: drawRequest.date.split("-").reverse().join("-"),
                comments: drawRequest.comments,
                host: drawRequest.host,
                participants: drawRequest.participants,
                dateRegistration: new Date(),
                sent: false
            });

            // Save draw in database
            draw.save();

            console.log(draw);

            transporter.use('compile', hbs(handlebarOptions));

            let status = false
            for (participant of draw.participants) {
                // Send the email
                await transporter.sendMail(mailOptions(participant.email,
                    draw.title,
                    participant.name,
                    draw.date,
                    draw.price,
                    draw.comments,
                    draw.host,
                    resultLink + participant._id),
                )
                    .then(info => {
                        console.log(info);
                        status = true
                    })
                    .catch(err => {
                        console.log(err);
                        status = false
                    }
                    );
            }

            if (status) {
                return res.status(200).json({
                    message: 'Success',
                });
            }

            if (!status) {
                return res.status(500).json({
                    message: 'Error',
                });
            }

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

function transformDateFormat(date) {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
}


// EXPORT CONTROLLER
module.exports = controller;

