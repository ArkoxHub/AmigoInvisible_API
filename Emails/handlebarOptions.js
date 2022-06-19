const path = require('path');

let handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: ".handlebars",
}

module.exports = handlebarOptions;