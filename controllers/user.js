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

module.exports = { createUser };