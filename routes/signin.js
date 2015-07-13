var config = require('../config');
var insta = require('instagram-node').instagram();

insta.use({
  client_id: config.instagram.clientID,
  client_secret: config.instagram.clientSecret
});

var redirect_uri = 'http://localhost:3000/api/callback';

module.exports.signin = function(req, res, next){
  	res.redirect(insta.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
}

module.exports.callback = function(req, res, next){
 insta.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {

      var accessToken = result.access_token,
      	insta_token = req.cookies.insta_token;	
      // set a cookie to the access token if not already
		if (insta_token === undefined) {
			res.cookie('insta_token', accessToken, { maxAge: 900000, httpOnly: true });
			console.log('cookie have created successfully');
		} 
		else{
			console.log('cookie exists');
		} 

      console.log("redirecting");
  		res.redirect('/search');
    }
  });
};

module.exports.test = function(req, res, next){
  insta.location_search({ lat: 37.7430954, lng:  -122.4053726 }, function(err, result, remaining, limit) {
  // insta.user_search('sam', function(err, users, remaining, limit) {
    if(err) { console.log( err ); }

    console.log("GOT EM");
    res.json(result);

  });
}
