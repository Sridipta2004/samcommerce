const userModel = require("../models/user.model")
const wishlistModel = require("../models/wishlist.model")

module.exports.addItemWishlist = async (request, response) => {
    try {
        
        let userId = request.user._id
        let { pid } = request.params

        let newWishlist = await wishlistModel.create({
            product: pid,
            user: userId
        })
        let user = await userModel.findById(userId)
        user.wishlists.push(newWishlist._id)
        await user.save()
        return response.status(201).send({ message: "Item Added to Wishlists!", success: true })
    } catch (error) {
        console.log(error);

        return response.status(500).send({ message: "Internal Server Problem", success: false })
    }
}
module.exports.viewItemsWishlist = async (request, response) => {
    try {
        let  userId  = request.user._id
        let wishlists = await wishlistModel.find({ user: userId }).populate('product').populate('user')
        return response.status(200).send({ message: "users wishlists", wishlists })
    } catch (error) {
        return response.status(500).send({ message: "Internal Server Problem", success: false })
    }
}