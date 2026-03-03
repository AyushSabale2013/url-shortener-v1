const express = require("express");
const path = require("path"); // for views (in build pacake in node)
const { connectionToMongoDB } = require("./connections.js");
const urlRouter = require("./routers/url.js");
const staticRouter = require("./routers/static.js");


// Basic setups
connectionToMongoDB("mongodb://127.0.0.1:27017/url_shortener")
    .then(() => {
        console.log("DataBase connected successfully");
    });

const port = 8001;
const app = express();
app.set("view engine", "ejs"); //set method ==> set(settingname , value)
app.set("views", path.resolve("./views")); //tells where is view





// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : true})); // for pasring url data





//routing
app.use("/url", urlRouter);
app.use("/", staticRouter)





// activating server
app.listen(port, () => {
    console.log(`server started successfully at port ${port}`);
});
