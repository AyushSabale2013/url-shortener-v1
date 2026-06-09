const express = require("express");
const { createUser , loginUser } = require("../controllers/user.js");


let userRouter = express.Router();



userRouter.route("/signUp")
    .get((req, res) => {
        console.log("get Request hit on signUP");
        return res.render("signUp");
    })
    .post(createUser);

userRouter.route("/login")
.post(loginUser);

module.exports = userRouter;
