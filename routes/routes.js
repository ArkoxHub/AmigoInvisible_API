// Router Middleware

const express = require('express');
const router = express.Router();

// Import controllers
const drawController = require("../Controllers/DrawController");

// MIDDLEWARES

/* AMIGO INVISIBLE */
router.get('/getUserData/:id', drawController.getUserData);
router.post('/sendEmails', drawController.sendEmails);
/* END AMIGO INVISIBLE */

module.exports = router;
