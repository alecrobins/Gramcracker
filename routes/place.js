/* require the modules needed */
var config = require('../config');

var yelp = require("yelp").createClient({
  consumer_key: config.yelp.consumerKey, 
  consumer_secret: config.yelp.consumerSecret,
  token: config.yelp.token,
  token_secret: config.yelp.tokenSecret
});

module.exports.place = function(req, res, next){
	var placeID = req.params.placeID; 

	console.log(req.params);

	yelp.business("garaje-san-francisco", function(error, data) {
	  console.log(">>>>>>>>>>>>>>>>>");
	  console.log(data);
	});

	res.json({test: "all good"});
}
