const mongoose = require('mongoose')
const { Schema, model } = mongoose

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    banner: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
}, { timestamps: true })
module.exports = model("Products", productSchema)