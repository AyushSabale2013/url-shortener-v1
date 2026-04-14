const express = require("express");
const { generateShortId, redirectShortIdfromUI, redirectShortId, deleteByUrl } = require("../controllers/url.js");


let urlRouter = express.Router();

urlRouter.route("/")
    .post(generateShortId)
    .get((req, res) => {
        res.render("home");

    })



urlRouter.route("/delete")
    .post(deleteByUrl);
urlRouter.route("/redirect")
    .get(redirectShortIdfromUI);




urlRouter.route("/:shortId")
    .get(redirectShortId);


module.exports = urlRouter;

