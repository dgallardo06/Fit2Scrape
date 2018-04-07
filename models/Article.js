var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//construct new schema
var ArticleSchema = new Schema({
	title: {
		type: String,
		requred: true
	},
	link: {
		type: String,
		requred: true
	},
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comment"
	}
});

//Create model using mongoose model method
var Article = mongoose.model("Article", ArticleSchema);

//export Article model
module.exports = Article;