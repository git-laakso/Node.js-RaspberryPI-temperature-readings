//Declaring constants
//Handling express framework
const express = require("express");
const app = express();
//Handling routes
const routes = require("./routes/routes.js");
//Handling Mongoose
const mongoose = require("mongoose");
const db = require("./config/keys_dev.js").mongoURI;
//Handling parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Do not edit code below this line

//Setting up MongoDB
mongoose
    .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//We are using pug as template engine
app.set("view engine", "pug");

//Routing
app.use("/", routes);

//Server is running on port 8080
app.listen(8080)
