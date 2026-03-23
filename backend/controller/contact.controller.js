const ContactMessage = require('../models/contact.model')

const createMessage = async (req, res) => {
    try {
        const { email, subject, message } = req.body
        const newMessage = new ContactMessage({ email, subject, message })
        await newMessage.save()
        res.status(201).json({ success: true, message: 'Message saved successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
}

module.exports = { createMessage }
