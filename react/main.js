/** @jsx React.DOM */

var React = require('react/addons');
var router = require('./router');
var API = require('./utils/API.js');

// Include the stores
var SearchStore = require('./stores/SearchStore');
var UserStore = require('./stores/UserStore');
var PlaceStore = require('./stores/UserStore');

var mountNode = document.getElementById("react-main-mount");

router.run(function(Handler){
	React.render(<Handler />, mountNode);
});