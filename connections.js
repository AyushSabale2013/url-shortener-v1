const mongoose = require("mongoose");

async function connectionToMongoDB(url) {
    try {
        const result = await mongoose.connect(url);
       return result;
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1); // stop app if DB fails
    }
}

module.exports = { connectionToMongoDB };