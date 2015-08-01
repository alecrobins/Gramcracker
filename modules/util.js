var oauthSignature = require('oauth-signature');  
var n = require('nonce')();  
var request = require('request');  
var qs = require('querystring');  
var _ = require('lodash');

var config = require('../config');

/* Function for yelp call
 * ------------------------
 * set_parameters: object with params to search
 * callback: callback(error, response, body)
 */
module.exports.request_yelp = function (set_parameters, callback) {
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

// Yelp search query into search obj
module.exports.searchToObj = function(query){
	return {
		"term": query.term || null,
		"limit": query.limit || null,
		"sort": query.sort || null,
		"category_filter": query.category_filter || null,
		"location": query.location || null,
		"cll": query.lat + "," + query.lng || null
	};
};

// check if s1 is a part of s2 or if s2 is a part of s1
module.exports.contains = function(s1, s2){
	return s1.indexOf(s2) > -1 || s2.indexOf(s1) > -1;
}
