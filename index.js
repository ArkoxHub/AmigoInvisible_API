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
    await mongoose.connect(connection);
    console.log(`Data Base Connected! \nConnection => ${database}`);

    app.listen(port, () => {
        console.log(`Server is up and listening at http://localhost:${port}`);
    })
}
