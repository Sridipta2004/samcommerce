const mongoose = require('mongoose')
const { Schema, model } = mongoose

const orderSchema = new Schema({
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
    paymentMethod: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: true
    },
    receipt: {
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = model("Orders", orderSchema)