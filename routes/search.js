/* require the modules needed */
var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');
var async = require('async');

var config = require('../config');
var http = require('http');

var insta = require('instagram-node').instagram();

insta.use({
  client_id: config.instagram.clientID,
  client_secret: config.instagram.clientSecret
});

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
var request_yelp = function (set_parameters, callback) {
	var yelp = config.yelp;
	/* The type of request */
	var httpMethod = 'GET';

	/* The url we are using for the request */
	var url = yelp.url;

	/* We can setup default parameters here */
	var default_parameters = {
	 location: 'San+Francisco',
	 sort: '2'
	};

	/* We set the require parameters here */
	var required_parameters = {
	 oauth_consumer_key : yelp.consumerKey,
	 oauth_token : yelp.token,
	 oauth_nonce : n(),
	 oauth_timestamp : n().toString().substr(0,10),
	 oauth_signature_method : 'HMAC-SHA1',
	 oauth_version : '1.0'
	};

	// remove null elements
	var user_parameters = set_parameters;
	for(var i in user_parameters){
		if(user_parameters[i] == null){
			delete user_parameters[i];
		}
	}

	/* We combine all the parameters in order of importance */ 
	var parameters = _.assign(default_parameters, user_parameters, required_parameters);

	/* We set our secrets here */
	var consumerSecret = yelp.consumerSecret;
	var tokenSecret = yelp.tokenSecret;

	/* Then we call Yelp's Oauth 1.0a server, and it returns a signature */
	/* Note: This signature is only good for 300 seconds after the oauth_timestamp */
	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false});

	/* We add the signature to the list of paramters */
	parameters.oauth_signature = signature;

	/* Then we turn the paramters object, to a query string */
	var paramURL = qs.stringify(parameters);

	/* Add the query string to the url */
	var apiURL = url+'?'+paramURL;

	/* Then we use request to send make the API Request */
	request(apiURL, function(error, response, body){
	 return callback(error, response, body);
	});

};

var searchToObj = function(query){
	console.log("search to obj");
	console.log(query);
	return {
		"term": query.term || null,
		"limit": query.limit || null,
		"sort": query.sort || null,
		"category_filter": query.category_filter || null,
		"location": query.location || null,
		"cll": query.latitude + "," + query.longitude || null
	};
};

module.exports.home = function(req, res, next){
	res.render('search', { title: 'Gramcracker' });
}

/* GET home page. */
module.exports.search = function(req, res, next) {
	async.series([
			function(cb){
				
				var searchData = [];

				// 1: get all resturant information from yelp
				request_yelp(searchToObj(req.body), function(error, res, body){
					console.log("SUCCEES");
					var data = JSON.parse(body);
					var asyncCallBacks = [];

					for(var i in data.businesses){
						var place = data.businesses[i];
						var placeCoords = place.location.coordinate;

						// create the new function that will be called in parallel
						var newPlaceFunc = createInstagramCallback(place.id,
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

// var searchLocationCallback = function(yelpID, placeName, lat, long){
// 	return function(callback){
		
// 		insta.location_search({ lat: 48.565464564, lng: 2.34656589 }, [options,] function(err, result, remaining, limit) {});

// 			insta.media_search(lat, long, function(err, medias, remaining, limit) {
// 				console.log("RETURNED INSTA SEARCH: " + placeName);

// 				callback(null, {
// 						"id": yelpID,
// 						"name": placeName,
// 						"media": medias
// 				});

// 			});
// 	};
// }

// TODO: MAKE THIS ASYNCRONOUSLY SEARCH THROUGH ALL LOCATIONS

var createInstagramCallback = function(yelpID, placeName, lat, lng){
	return function(callback){
		
		// do a search for the location id then a search on the location id
		insta.location_search({ lat: lat, lng: lng }, function(err, result, remaining, limit) {
			var locationID = 0;
			
			for(var i in result){
				if(result[i].name === placeName){
					locationID = result[i].id;
					break;
				}
			}
			// search based on the id
			insta.location_media_recent(locationID, function(err, result, pagination, remaining, limit) {
				console.log("RETURNED INSTA SEARCH: " + placeName);
				callback(null, {
						"id": yelpID,
						"name": placeName,
						"media": result,
						"pagination": pagination,
						"remaining": remaining,
						"limit": limit
				});

			});

		});

	};
}
