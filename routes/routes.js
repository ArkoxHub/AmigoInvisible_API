// Router Middleware

const express = require('express');
const router = express.Router();

// Import controllers
const drawController = require("../Controllers/DrawController");
const wishlistController = require("../Controllers/WishlistController");

// MIDDLEWARES

/* AMIGO INVISIBLE */

// Draw
router.get('/getUserData/:id', drawController.getUserData);
router.get('/getDraw/:id', drawController.getDrawById);
router.put('/updateDraw', drawController.updateDraw);
router.post('/sendEmails', drawController.sendEmails);

// Wishlist


/* END AMIGO INVISIBLE */

module.exports = router;
