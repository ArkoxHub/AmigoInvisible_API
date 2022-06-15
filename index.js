// APP
const app = require('./app');
const port = process.env.PORT || 5445;

// DB
const mongoose = require('mongoose');
const database = process.env.DATABASE || 'mongodb+srv://amigoinvisibleadmin:powalolA88@amigoinvisible.mvn1l.mongodb.net/amigoinvisible?retryWrites=true&w=majority';
const connection = database;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(connection);
    console.log(`Data Base Connected! \nConnection => ${database}`);

    app.listen(port, () => {
        console.log(`Server is up and listening at http://localhost:${port}`);
    })
}