const express = require('express')
const { viewOrder, ceateOrder, verifyPayment, addToOrders } = require('../controller/order.controller')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post("/create/:pid", auth, ceateOrder)
router.post("/verify-payment", auth, verifyPayment)
router.post("/add/:pid", auth, addToOrders)
router.get("/view", auth, viewOrder)

module.exports = router