const express = require('express')
const { viewOrder, ceateOrder, verifyPayment } = require('../controller/order.controller')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post("/create/:pid", auth, ceateOrder)
router.post("/verify-payment", auth, verifyPayment)
router.get("/view", auth, viewOrder)

module.exports = router