function message(messageTo, html) {
    return {
        from: '"🎁 Amigo Invisible" <sorteo@amigoinvisible.net>',
        to: messageTo,
        subject: 'Resultado del sorteo',
        text: 'First email send from NodeJS using Nodemailer',
        html: html
    }
}

module.exports = message;