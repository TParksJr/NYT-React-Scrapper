var Article = require("../models/Article.js");
var Note = require("../models/Note.js");
var path = require("path");

module.exports = function (app) {
  app.post("/api/save/:id", function (req, res) {
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

  app.get("/api/saved", function (req, res) {
    Article.find({}).then(results => res.json(results)).catch(err => res.json(err));
  });

  app.get("/api/notes/:id", function (req, res) {
    Note.find({article: req.params.id}).then(results => res.json(results)).catch(err => res.json(err));
  });

  app.put("/api/delete/:id", function (req, res) {
    Article.findByIdAndRemove(req.params.id).then(deletedEntry => res.json(deletedEntry)).catch(err => res.json(err));
  });

  app.put("/api/note/:id", function (req, res) {
    Note.create(req.body).then(newEntry => console.log("newEntry: " + newEntry)).catch(err => res.json(err));
    Article.findByIdAndUpdate(req.params.id, {$push: {notes: req.params.id}}).then(updatedEntry => console.log("updatedEntry: " + updatedEntry)).catch(err => res.json(err));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
};
