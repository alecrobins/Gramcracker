/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./Header');
var HomePage = require('./HomePage');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  // Render the component
  render: function(){
    return (
    	<div>
      	<Header />
        <RouteHandler />
      </div>
   );
  }
});

module.exports = App;

// // render the app with the passed in data once initiated
// if (typeof window !== 'undefined') {
//     var props = JSON.parse(document.getElementById("props").innerHTML);
//     React.render(
//         React.createElement(App, props),
//         document.getElementById('react-main-mount')
//     );
// }