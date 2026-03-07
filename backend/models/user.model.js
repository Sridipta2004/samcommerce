const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Products"
    }],
    orders: [{
        type: mongoose.Types.ObjectId,
        ref: "Orders"
    }],
    wishlists: [{
        type: mongoose.Types.ObjectId,
        ref: "Wishlists"
    }]
})
module.exports = model("Users", userSchema)