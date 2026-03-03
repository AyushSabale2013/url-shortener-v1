const express = require("express");
const { generateShortId, redirectShortIdfromUI, redirectShortId, deleteByUrl } = require("../controllers/url.js");


let urlRouter = express.Router();

urlRouter.route("/")
    .post(generateShortId)

    .get(redirectShortIdfromUI);

urlRouter.route("/delete")


    .post(deleteByUrl);



urlRouter.route("/:shortId")
    .get(redirectShortId);


module.exports = urlRouter;

