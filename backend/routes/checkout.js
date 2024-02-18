const express = require("express");
const { checkout } = require("../controller/checkoutController");
const router = express.Router();

//All routes for product
router.post('/checkout', checkout)

module.exports = router;