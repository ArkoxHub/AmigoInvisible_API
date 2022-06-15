// CONTROLER RECEIVES DRAW REQUEST FROM CLIENT
const Draw = require('../Models/Draw');
const crypto = require('crypto')
const transpsorter = require('../Email/transporter');
const message = require('../Email/message');

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
            let drawRequest = req.body;

            const draw = new Draw({
                drawID: crypto.randomUUID(),
                name: drawRequest.name,
                price: drawRequest.price,
                date: new Date(),
                comments: drawRequest.comments,
                participants: drawRequest.participants,
                sent: false
            });

            console.log(draw);
            draw.save();


            // Send the email
            transpsorter.sendMail(message("agualandreu@gmail.com", "<h2>Hello World from Nodejs NodeMailer</h2>"), (err, info) => {
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

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Error en el servidor al intentar enviar los correos a los participantes. Por favor intente de nuevo más tarde."
            })
        }
    },
}

// EXPORT CONTROLLER
module.exports = controller;

