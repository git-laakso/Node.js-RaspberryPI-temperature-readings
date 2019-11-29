//Declaring constants
const express = require("express");
const route = express.Router();
const controller = require("./controllers/controller.js");

//Building routes
route.get("/", (req, res) => {
    controller.getLogPage(req, res);
});

//

route.post("/", (req, res) => {
    controller.postNewLog(req, res, body);
});

//Exporting
module.exports = route;