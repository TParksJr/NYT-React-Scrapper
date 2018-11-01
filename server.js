require("dotenv").config();
var express = require("express");
var PORT = process.env.PORT || 3001;
var app = express();
var bodyParser = require("body-parser");
var logger = require("morgan");
var path = require("path");
var mongoose = require("mongoose")
var Note = require("./db/models/Note.js");
var Article = require("./db/models/Article.js");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger("dev"));

mongoose.connect("mongodb://localhost/nytdb", { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.post("/save/:id", function(req, res) {
  var articleId = req.params.id;
  var content = req.body;
  var newObj = {
    headline = content.headline.main,
    date = content.pub_date,
    wordCount = content.word_count,
    score = content.score,
    url = content.web_url,
    notes = []
  }

  Article.create({newObj}).then(newEntry => console.log(newEntry)).catch(err => res.json(err))
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
