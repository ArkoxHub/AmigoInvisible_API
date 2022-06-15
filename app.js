const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Body Parser
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// CORS
const cors = require('cors')
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(cors());

// Routes
const routes = require('./routes/routes')
app.use('/', routes)

module.exports = app;