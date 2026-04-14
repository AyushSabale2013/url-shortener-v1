const express = require("express");

let urlRouter = express.Router();




urlRouter.route("/")
    .get(async (req, res) => {
        res.render("index");

    });
urlRouter.route("/signUp")
    .get(async (req, res) => {
        res.render("signUp");

    });

module.exports = urlRouter;