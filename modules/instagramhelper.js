/* require the modules needed */
var _ = require('lodash');
var async = require('async');
var lev = require('levenshtein');

var config = require('../config');
var util = require('./util');

var insta = require('instagram-node').instagram();

insta.use({
  client_id: config.instagram.clientID,
  client_secret: config.instagram.clientSecret
});

var instagramhelper = {};

instagramhelper.createInstagramCallback = function(placeData, yelpID, placeName, lat, lng){
	var self = this;
	
	return function(callback){

		// do a search for the location id then a search on the location id
		insta.location_search({ lat: lat, lng: lng }, function(err, result, remaining, limit) {
			var asyncCallBacks = [];

			// strip word of all characters and spaces
			var place = placeName.replace(/[_\W]/g, '').toLowerCase();
			
			for(var i in result){

				// strinp word
				var instaPlace = result[i].name.replace(/[_\W]/g, '').toLowerCase();

				// computee levenshtein distance between the place name and
				// the instagram name to account for difference in spelling
				var l = new lev(place, instaPlace);
				
				// if the levenshtein distance is less then 3 then continue
				if(l <= 3 || util.contains(place, instaPlace)){
					// pass the location id to the callback
					var locationCallback = self.createLocationCallback(result[i].id);
					asyncCallBacks.push(locationCallback);
				}

			}

			// collect all the pictures from all the places
			async.parallel(asyncCallBacks, function(err, results){
				
				// keep track of the pagination, limit, remaing, and locationID
				// for each instagram result
				var insta_meta = [];
				var media = [];

				for(var i in results){
					
					// format meta data
					insta_meta.push({
						limit: results[i].limit,
						locationID: results[i].locationID,
						pagination: results[i].pagination,
						remaining: results[i].remaining
					});

					// concat all meida into one array
					media = media.concat(results[i].data);
				}

				// TODO: sort give a food score to each instagram photo
				// based on likes, comments mentioning food

				// this is what is returned to the client
				callback(null, {
						"id": yelpID,
						"name": placeName,
						"place": placeData, 
						"media": _.sortByOrder(media, ['likes.count', 'comments.count'], ['desc', 'desc']),
						"insta_meta": insta_meta
				});

			});
		});
	};
}

// create a callback for instagram pictures at a certain location
instagramhelper.createLocationCallback = function(locationID){
	return function(callback){
		insta.location_media_recent(locationID, function(err, result, pagination, remaining, limit) {
			callback(null, {
				"locationID": locationID, 
				"data": result,
				"pagination": pagination,
				"remaining": remaining,
				"limit": limit
			});
		});
	}
}


instagramhelper.searchLocationCallback = function(yelpID, placeName, lat, lng){
	return function(callback){
		
		insta.location_search({ lat: lat, lng: lng }, function(err, result, remaining, limit) {

			insta.media_search(lat, long, function(err, medias, remaining, limit) {
				console.log("RETURNED INSTA SEARCH: " + placeName);
				callback(null, { "media": medias });
			});
		});
	}
}

module.exports = instagramhelper;