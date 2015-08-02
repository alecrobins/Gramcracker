var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var App = require('./components/App');
var Search = require('./components/Search');
var Place = require('./components/Place');
var HomePage = require('./components/HomePage');

// declare our routes and their hierarchy
var routes = (
  <Route path="/" handler={App}>
  		<DefaultRoute name="home" handler={HomePage}/>
   	<Route name="search" path="/search?" handler={Search} />
   	<Route name="place" path="/place/:id" handler={Place} />
  </Route>
);

module.exports = routes;