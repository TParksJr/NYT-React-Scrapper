var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  article: {
    type: Schema.Types.ObjectId,
    ref: "Article"
  },
  body: {
    type: String,
    required: true
  }
});

var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;