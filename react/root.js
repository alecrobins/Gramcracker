var React = require('react/addons');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;

var App = require('./components/App');
var Search = require('./components/Search');
var Place = require('./components/Place');

// declare our routes and their hierarchy
var Root = (
  <Route path = "/" name = "home" handler={App}>
    <Route name="search" path="/search" handler={Search} />
    <Route name="place" path="/place" handler={Place} />
  </Route>
);

module.exports = Root;

// http://rackt.github.io/react-router/