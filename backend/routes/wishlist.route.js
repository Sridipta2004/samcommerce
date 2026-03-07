const express = require('express')
const { addItemWishlist, viewItemsWishlist } = require('../controller/wishlist.controller')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post("/add-item/:pid", auth, addItemWishlist)
router.get("/all-items", auth, viewItemsWishlist)

module.exports = router