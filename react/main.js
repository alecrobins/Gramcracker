/** @jsx React.DOM */

var React = require('react/addons');
// var ReactApp = require('./components/ReactApp');
var Router = require('react-router');
var Root = require('./Root');
var API = require('./utils/API.js');

var mountNode = document.getElementById("react-main-mount");

Router.run(Root, function (Handler) {
  React.render(<Handler />, mountNode);
});
