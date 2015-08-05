var _index = require('./index');
var _search = require('./search');
var _signin = require('./signin');
var _place = require('./place');

// Handle all the routes
module.exports = function(app){

	// PAGE ROUTES
	app.get("/*", _index.home);
	app.get("/place/*", function(req, res){
		res.json({test: "world"});
	});
	// app.get("/search", _search.home);

	// INSTAGRAM SIGN IN
	app.get("/api/callback", _signin.callback);
	app.get("/api/signin", _signin.signin);

	// SEARCH
	app.post("/api/search", _search.search);

	// PLACE SEARCH
	app.post("/api/place", _place.place);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

}
