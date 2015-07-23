/** @jsx React.DOM */

var React = require('react/addons');
var ReactApp = require('./components/ReactApp');
var API = require('./utils/API.js');

var mountNode = document.getElementById("react-main-mount");

// TODO: need to include a router that will make action calls
// This will simulate call to an api
API.getTestData();

React.render(<ReactApp />, mountNode);