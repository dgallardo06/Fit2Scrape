var cheerio = require("cheerio");
var request = require("request");
var express = require("express");
var mongojs = require("mongojs");
var bodyParser = require("body-parser");

var db = require("./models");
var PORT = 3000;
var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/fit2scrape", {useMongoClient: true});


//***Routes***

//route for scraping espn fc website
app.get("/scrape", function(req, res){
	//make request call to grab HTML body from espnfc news site
	request("http://www.espnfc.com/news", function (error, response, html){
		
		//load HTML into cheerio and save it to $
		var $ = cheerio.load(html);

		//empty object to save scraped data
		var result = {};

		//select each element in HTML body with class 'feed-item-content'
		$("div.text-content > h2").each(function(i, element) {

			result.title = $(this)
				.children("a")
				.text("a");
			result.link = $(this)
				.children("a")
				.attr("href");
			
			db.Article.create(result).then(function(dbArticle){
				console.log(dbArticle);
			})
			.catch(function(err){
				return res.json(err);
			});
		});

		//log results to console
		console.log(results);
	});

	res.send("Scrape Complete");
});

//route to get all articles from db
app.get("/articles", function(req,res){
	db.Article.find({})
		.then(function(dbArticle){
			res.json(dbArticle);
		})
		.catch(function(err){
			res.json(err);
		});
});

//route to get all comments from db
app.get("/comments", function(req,res){
	db.Comment.find({})
		.then(function(dbComment){
			res.json(dbComment);
		})
		.catch(function(err){
			res.json(err);
		});
});

app.listen(PORT, function(){
	console.log("App running on port " + PORT + "!");
});