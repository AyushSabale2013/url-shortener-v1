const userModel = require("../models/user.js");

async function createUser(req, res) {
    try {
        console.log("Request hit on post of signUP");
        const { userName, emailID, password } = req.body;

        console.log(req.body); // debug

        const newUser = await userModel.create({
            userName,
            emailID,
            password
        });

        console.log("User created:", newUser);

        return res.render("index");

    } catch (err) {
        console.log("ERROR:", err);
        return res.send("Error creating user");
    }
}


async function loginUser(req, res) {
    try {
        console.log("Request hit on post of login");

        const { emailID, password } = req.body;

        const user = await userModel.findOne({ emailID });

        if (!user) {
            return res.send("User not found");
        }

        if (user.password !== password) {
            return res.send("Invalid password");
        }

        console.log("Login successful:", user);

        return res.render("home");

    } catch (err) {
        console.log("ERROR:", err);
        return res.send("Error logging in");
    }
}

module.exports = { createUser , loginUser};