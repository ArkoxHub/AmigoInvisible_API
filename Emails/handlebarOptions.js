const path = require('path');

let handlebarOptions = {
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('./Views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./Views'),
    extName: ".handlebars",
}

module.exports = handlebarOptions;