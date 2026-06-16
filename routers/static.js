const express = require("express");
let staticRouter = express.Router();




staticRouter.route("/")
    .get(async (req, res) => {
        res.render("index");

    });


module.exports = staticRouter;