/* require the modules needed */
var async = require('async');
var instagramhelper = require('../modules/instagramhelper');
var util = require('../modules/util');

module.exports.home = function(req, res, next){
	res.render('search', { title: 'Gramcracker' });
}

module.exports.search = function(req, res, next) {
	async.series([
			function(cb){
				
				var searchData = [];

				// 1: get all resturant information from yelp
				util.request_yelp(util.searchToObj(req.body), function(error, res, body){
					var data = JSON.parse(body);
					var asyncCallBacks = [];

					for(var i in data.businesses){
						var placeData = data.businesses[i];
						var placeCoords = placeData.location.coordinate;

						// create the new function that will be called in parallel
						var newPlaceFunc = instagramhelper.createInstagramCallback(placeData, placeData.id,
								 placeData.name, placeCoords.latitude, placeCoords.longitude);

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

