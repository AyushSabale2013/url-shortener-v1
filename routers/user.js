const express = require("express");
const { createUser } = require("../controllers/user.js");


let userRouter = express.Router();



userRouter.route("/signUp")
    .get((req, res) => {
        console.log("get Request hit on signUP");
        return res.render("signUp");
    })
    .post(createUser).then(popup);


module.exports = userRouter;