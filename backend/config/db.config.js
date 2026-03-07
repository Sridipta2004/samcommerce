const mongoose = require('mongoose')

module.exports.dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Database Connected ✅");
    } catch (error) {
        console.log("Connection Error ❌");
        console.log(error);
        process.exit(1)
    }
}