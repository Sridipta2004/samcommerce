const express = require('express')
const { addProduct, getProduct, deleteProduct, updateProduct, getProductById } = require('../controller/product.controller')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post("/add", auth, addProduct)
router.get("/all", getProduct)
router.get("/:id", getProductById)
router.delete("/delete/:id", auth, deleteProduct)
router.put("/update/:id", auth, updateProduct)

module.exports = router