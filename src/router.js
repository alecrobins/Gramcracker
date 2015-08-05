var routes = require('./routes'),
    Router = require('react-router');
var React = require('react/addons');

if (typeof window !== 'undefined') {

  var mountNode = document.getElementById("react-main-mount");

  Router.run(routes, Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, mountNode);
  });
}