/* require the modules needed */
var config = require('../config');
var async = require('async');
var instagramhelper = require('../modules/instagramhelper');

var yelp = require("yelp").createClient({
  consumer_key: config.yelp.consumerKey, 
  consumer_secret: config.yelp.consumerSecret,
  token: config.yelp.token,
  token_secret: config.yelp.tokenSecret
});

module.exports.place = function(req, res, next){
	var placeID = req.body.placeID; 

	async.series([
		function(cb){
			yelp.business(placeID, function(error, placeData) {
				if(placeData.location != undefined){
					var placeCoords = placeData.location.coordinate;
					var instaCallback = instagramhelper.createInstagramCallback(placeData, placeData.id,
							 placeData.name, placeCoords.latitude, placeCoords.longitude);
				
					async.series([instaCallback],
						function(err, results){
							cb(null, results);
						});
				}else{
					cb(null, null); // return null
				}
			});
		}],
		function(err, results){
			res.json(results[0]);
		});

}
