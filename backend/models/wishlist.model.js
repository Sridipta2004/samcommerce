const mongoose = require('mongoose')
const { Schema, model } = mongoose

const wishlistSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
        required: true
    },
}, { timestamps: true })
module.exports = model("Wishlists", wishlistSchema)