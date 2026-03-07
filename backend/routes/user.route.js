const express = require('express')
const { userLogin, userRegister, userProfile } = require('../controller/user.controller')
const { auth } = require('../middleware/auth.middleware')
const router = express.Router()

router.post("/login", userLogin)
router.post("/register", userRegister)
router.get("/profile", auth, userProfile)

module.exports = router