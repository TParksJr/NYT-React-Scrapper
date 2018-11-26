require("dotenv").config();
var express = require("express");
var PORT = process.env.PORT || 3001;
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger("dev"));

if (process.env.NODE_ENV === "production") {
  mongoose.connect("mongodb://heroku_nvprgdc5:76n07geq0hpqcc9elpfrmto1gr@ds029847.mlab.com:29847/heroku_nvprgdc5", { useNewUrlParser: true });
} else {
  mongoose.connect("mongodb://localhost:27017/nytdb", { useNewUrlParser: true });
};

var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

require('./routes/routes.js')(app);

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
