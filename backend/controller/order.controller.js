const orderModel = require("../models/order.model")
const userModel = require("../models/user.model")
const Razorpay = require("razorpay")

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.ceateOrder = async (request, response) => {
    try {
        let userId = request.user._id
        let { pid } = request.params
        let { amount } = request.body

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
        };

        const order = await razorpay.orders.create(options);
        if (!order) {
            return response.status(500).send({ message: "Some error occured", success: false })
        }

        let newOrder = await orderModel.create({
            product: pid,
            user: userId,
            paymentMethod: "razorpay",
            amount: amount * 100,
            status: "pending",
            receipt: order.id
        })
        let user = await userModel.findById(userId)
        user.orders.push(newOrder._id)
        await user.save()
        return response.status(201).send({ message: "Order Booking Successfull!", success: true, order })
    } catch (error) {
        return response.status(500).send({ message: "Internal Server Problem", success: false })
    }
}

module.exports.verifyPayment = async (request, response) => {
    const crypto = require("crypto");
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
        await orderModel.findOneAndUpdate({ receipt: razorpay_order_id }, { status: "completed" })
        response.json({ success: true, message: "Payment verified successfully" });
    } else {
        response.json({ success: false, message: "Payment verification failed" });
    }
}


module.exports.viewOrder = async (request, response) => {
    try {
        let userId = request.user._id
        let orders = await orderModel.find({ user: userId }).populate('product').populate('user')
        return response.status(200).send({ message: "List of Orders", orders })
    } catch (error) {
        return response.status(500).send({ message: "Internal Server Problem", success: false })
    }
}

