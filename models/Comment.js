var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//create new schema
var CommentSchema = new Schema({
	body: String
});

//create Comment model
var Comment = mongoose.model("Comment", NoteSchema);

//export Comment model
module.exports = Comment;