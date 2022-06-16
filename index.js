// APP
const app = require('./app');
const port = process.env.PORT;

require("dotenv").config();

// DB
const mongoose = require('mongoose');
const database = process.env.DATABASE
const connection = database;

main().catch(err => console.log(err));

async function main() {
    await mongoose
        .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Data Base Connected! \nConnection => ${database}`))
        .catch(err => console.log(err));

    app.listen(port, () => {
        console.log(`Server is up and listening at http://localhost:${port}`);
    })
}
