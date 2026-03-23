const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

module.exports.addProduct = async (request, response) => {
    try {
        let { title, description, price, banner, zip } = request.body;
        let { _id } = request.user;
        if (!title || !description || !price || !banner || !zip) {
            return response.status(400).send({ message: "All Fields are Required!", success: false })
        } else {
            let newProduct = await productModel.create({
                title,
                description,
                price,
                banner,
                zip,
                user: _id
            })
            let user = await userModel.findById(_id)
            user.products.push(newProduct._id)
            await user.save()
            return response.status(201).send({ message: "New Product added successfully!", success: true, product: newProduct })
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal Server Problem", success: false })
    }
}
module.exports.getProduct = async (request, response) => {
    try {
        let products = await productModel.find().populate('user')
        return response.status(200).send({ message: "All Products", success: true, products })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal Server Problem", success: false })
    }
}
module.exports.getProductById = async (request, response) => {
    let productId = request.params.id
    try {
        let product = await productModel.findById(productId).populate('user')
        return response.status(200).send({ message: "Product Details", success: true, product })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal Server Problem", success: false })
    }
}

module.exports.deleteProduct = async (request, response) => {
    let productId = request.params.id
    try {
        const productModel = require("../models/product.model");
        const userModel = require("../models/user.model");
        const product = await productModel.findById(productId).populate('user');
        if (!product) {
            return response.status(404).json({ message: "Product not found", success: false });
        }
        if (product.user._id.toString() !== request.user._id.toString()) {
            return response.status(403).json({ message: "Unauthorized: You can only delete your own products", success: false });
        }
        // Remove from user's products array
        await userModel.updateOne(
            { _id: product.user._id },
            { $pull: { products: productId } }
        );
        // Delete product
        await productModel.findByIdAndDelete(productId);
        return response.status(200).send({ message: "Product Deleted Successfully", success: true });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal Server Problem", success: false });
    }
}

module.exports.updateProduct = async (request, response) => {
    let productId = request.params.id
    try {
        let updatedProduct = await productModel.findByIdAndUpdate(productId, request.body)
        return response.status(200).send({ message: "Product Updated Successfully", success: true, updatedProduct })
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Internal Server Problem", success: false })
    }
}