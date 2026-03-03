const express = require("express");

let urlRouter = express.Router();




urlRouter.route("/")
    .get(async (req, res) => {
        res.render("home");

    });

module.exports = urlRouter;