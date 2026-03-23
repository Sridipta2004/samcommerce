const express = require('express')
const { createMessage } = require('../controller/contact.controller')
const router = express.Router()

router.post('/contact-message', createMessage)

module.exports = router
