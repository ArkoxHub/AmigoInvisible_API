
function mailOptions(messageTo, drawTitle, name, date, price, comment, host, resultLink, wishlistLink, participantId) {
    return {
        from: '"🎁 Amigo Invisible" <sorteo@amigoinvisible.net>',
        to: messageTo,
        subject: 'Resultado del sorteo',
        template: 'draw',
        context: {
            title: drawTitle,
            name: name,
            price: price,
            comment: comment,
            host: host,
            date: date,
            resultLink: resultLink,
            wishlistLink: wishlistLink,
            giftsLink: "https://www.amigoinvisible.net/regalos-amigo-invisible",
            idParticipant: participantId
        }
    }
}

module.exports = mailOptions;