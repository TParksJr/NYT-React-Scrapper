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

mongoose.connect("mongodb://localhost:27017/nytdb", { useNewUrlParser: true });
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.post("/api/save/:id", function(req, res) {
  var content = req.body;
  var newObj = {
    headline: content.headline.main,
    date: content.pub_date,
    wordCount: content.word_count,
    score: content.score,
    url: content.web_url,
    notes: []
  }
  Article.create(newObj).then(newEntry => res.json(newEntry)).catch(err => res.json(err));
});

app.get("/api/saved", function(req, res) {
  Article.find({}).then(results => res.json(results)).catch(err => res.json(err));
});

app.put("/api/delete/:id", function(req, res) {
  Article.findByIdAndRemove(req.params.id).then(deletedEntry => res.json(deletedEntry)).catch(err => res.json(err));
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
