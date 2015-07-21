/* require the modules needed */
var _ = require('lodash');
var async = require('async');
var http = require('http');

var config = require('../config');
var util = require('../modules/util');

var insta = require('instagram-node').instagram();

insta.use({
  client_id: config.instagram.clientID,
  client_secret: config.instagram.clientSecret
});

module.exports.home = function(req, res, next){
	res.render('search', { title: 'Gramcracker' });
}

/* GET home page. */
module.exports.search = function(req, res, next) {
	async.series([
			function(cb){
				
				var searchData = [];

				// 1: get all resturant information from yelp
				util.request_yelp(util.searchToObj(req.body), function(error, res, body){
					console.log("SUCCEES");
					var data = JSON.parse(body);
					var asyncCallBacks = [];

					for(var i in data.businesses){
						var place = data.businesses[i];
						var placeCoords = place.location.coordinate;

						// create the new function that will be called in parallel
						var newPlaceFunc = createInstagramCallback(place, place.id,
								 place.name, placeCoords.latitude, placeCoords.longitude);

						asyncCallBacks.push(newPlaceFunc);
					}

					// search all the instagram photos in parallel
					async.parallel(asyncCallBacks, function(err, results){
						console.log("ALL PARALLEL RESULTS WERE RETURNED");
						cb(null, results);
					});

				});
			}
		],
		function(err, results){
			res.json(results);
		});
};

var searchLocationCallback = function(yelpID, placeName, lat, lng){
	return function(callback){
		
		insta.location_search({ lat: lat, lng: lng }, function(err, result, remaining, limit) {

			insta.media_search(lat, long, function(err, medias, remaining, limit) {
				console.log("RETURNED INSTA SEARCH: " + placeName);
				callback(null, { "media": medias });
			});
		});
	}
}

var createInstagramCallback = function(place, yelpID, placeName, lat, lng){
	return function(callback){
		
		// do a search for the location id then a search on the location id
		insta.location_search({ lat: lat, lng: lng }, function(err, result, remaining, limit) {
			var locationID = 0;
			var asyncCallBacks = [];

			for(var i in result){
				if(result[i].name === placeName){
					locationID = result[i].id;
					var locationCallback = createLocationCallback(locationID);
					asyncCallBacks.push(locationCallback);
				}
			}

			// collect all the pictures from all the places
			async.parallel(asyncCallBacks, function(err, results){
				callback(null, {
						"id": yelpID,
						"name": placeName,
						"place": place, 
						"media": results,
				});
			});
		});
	};
}

// create a callback for instagram pictures at a certain location
var createLocationCallback = function(locationID){
	return function(callback){
		insta.location_media_recent(locationID, function(err, result, pagination, remaining, limit) {
			callback(null, {
				"locationID": locationID, 
				"data": _.sortByOrder(result, ['likes.count', 'comments.count'], ['desc', 'desc']),
				"pagination": pagination,
				"remaining": remaining,
				"limit": limit
			});
		});
	}
}
