const mongoose = require('mongoose')
const { Schema, model } = mongoose

const contactSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('ContactMessages', contactSchema)
