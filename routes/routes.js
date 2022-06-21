// Router Middleware

const express = require('express');
const router = express.Router();

// Import controllers
const drawController = require("../Controllers/DrawController");

// MIDDLEWARES
router.get('/getUserData/:id', drawController.getUserData);
router.post('/sendEmails', drawController.sendEmails);

module.exports = router;
