let jwt = require('jsonwebtoken')
let User = require('../models/user.model')


module.exports.auth = async (request, response, next) => {
    try {
        let token = request.headers?.authorization;
        if (!token) {
            return response.status(401).json({ message: "Unauthorized Access", success: false })
        } else {
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded) {
                let _id = decoded._id;
                let user = await User.findById(_id)
                request.user = user;
                next();
            } else {
                return response.status(401).json({ message: "Unauthorized Access", success: false })
            }
        }
    } catch (error) {
        return response.status(500).json({ message: error.message, success: false })
    }
}