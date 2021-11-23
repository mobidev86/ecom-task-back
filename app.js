"use strict";

//configurations
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jsonResponse = require("./utils/json-response");
const errors = require("./utils/errorConstant");
const cors = require("cors");
const config = require("./config");
const http = require("http");

//express configurations
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors());

require("./utils/db-connection");

//Create HTTP server.
const server = http.createServer(app);

//Get port from environment and store in Express.
const port = process.env.PORT || 4000;
app.set("port", port);

server.listen(port, console.log(`Listening on port ${port}`));

// FOR API
app.get("/", (req, res) => {
  res.json("Backend operational");
});

//User Route
const user = require("./routes/user");
app.use("/user", user);

//Product Route
const product = require("./routes/product");
app.use("/product", product);

//Order Route
const order = require("./routes/order");
app.use("/order", order);

//Offer Route
const offer = require("./routes/offer");
app.use("/offer", offer);

// catch 404 and forward to error handler
app.use((req, res) => {
  console.log("Error: No route found or Wrong method name", req.url);
  jsonResponse(res, errors.internalServer(true));
});

module.exports = app;
