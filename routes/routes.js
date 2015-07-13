var _index = require('./index');
var _search = require('./search');
var _signin = require('./signin');

// Handle all the routes
module.exports = function(app){

	// PAGE ROUTES
	app.get("/", _index.home);
	app.get("/search", _search.home);

	// INSTAGRAM SIGN IN
	app.get("/api/callback", _signin.callback);
	app.get("/api/signin", _signin.signin);
	app.get("/api/test", _signin.test);

	// SEARCH
	app.post("/api/searchYelp", _search.search);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

}
