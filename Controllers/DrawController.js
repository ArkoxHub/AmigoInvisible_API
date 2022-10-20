// CONTROLER RECEIVES DRAW REQUEST FROM CLIENT
const Draw = require('../Models/Draw');
const crypto = require('crypto')

const resultLink = 'https://www.amigoinvisible.net/resultado/'
const wishlist = 'https://www.amigoinvisible.net/lista-de-deseos/'
const recoveryLink = 'https://www.amigoinvisible.net/recuperacion-sorteo/'

// Email
const transporter = require('../Emails/transporter');
var handlebarOptions = require('../Emails/handlebarOptions');
var hbs = require('nodemailer-express-handlebars');
var mailOptions = require('../Emails/mailOptions');

let controller = {

    /**
     * Get specific participant of a draw
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Get draw from ID sent by client
     * @param {*} req 
     * @param {*} res 
     */
    getDrawById: (req, res) => {
        try {
            let id = req.params.id;

            Draw.findById(id, function (err, draw) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: 'Error en el servidor' });
                } else {
                    if (draw) {
                        res.status(200).send(draw);
                    } else {
                        res.status(200).send({ message: 'Draw no encontrado' });
                    }
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Error obteniendo el sorteo' });
        }
    },

    /**
     * Actualiza el sorteo
     * @param {*} req 
     * @param {*} res 
     */
    updateDraw: async (req, res) => {
        try {
            let draw = req.body

            if (!draw) {
                res.status(400).send({ message: 'Faltan datos', status: 0 });
                return false;
            }

            Draw.findByIdAndUpdate(draw._id, draw, { new: true }, ((err, drawUpdated) => {
                if (err || !drawUpdated) {
                    res.status(500).send({ message: 'Error en el servidor', status: 0 })
                } else {
                    res.status(200).send({ data: drawUpdated, status: 1 })
                }
            }))

        } catch (err) {
            console.log(err);
            res.status(500).send({ message: 'Error actualizando el sorteo', status: 0 })
        }
    },


    /**
     * Send email template to each participant of draw
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
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

            let emailsSent = 0;
            for (participant of draw.participants) {
                // Send the email
                await transporter.sendMail(mailOptions
                    (
                        participant.email,
                        draw.title,
                        participant.name,
                        draw.date,
                        draw.price,
                        draw.comments,
                        draw.host,
                        resultLink + participant._id,
                        wishlist + draw._id + '/' + participant._id,
                        participant._id,
                        recoveryLink + draw._id
                    )
                )
                    .then(info => {
                        emailsSent++;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }

            if (emailsSent == draw.participants.length) {
                return res.status(200).json({
                    message: 'Success',
                });
            }

            if (emailsSent < draw.participants.length) {
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

