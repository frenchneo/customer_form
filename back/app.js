const Express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// *************************************************
// Setup Express
// *************************************************

const app = Express();
app.use(Express.urlencoded({ extended: true }));

app.use(cors());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Content-Type", "application/*+json");
  res.header("Accept", "application/json");
  next();
});

// *************************************************
// Routes
// *************************************************

const helloRoute = require("./src/routes/hello");

var apiSlug = "/api/v1";

app.use(apiSlug + "/hello", helloRoute);

module.exports = app;
