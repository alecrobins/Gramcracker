/** @jsx React.DOM */

var React = require('react/addons');
var TestDataStore = require('../stores/TestDataStore');
var TestDataActions = require('../actions/TestDataActions.js');
var Header = require('./Header');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Method to retrieve application state from store
function getAppState() {
  return TestDataStore.getData();
}

var App = React.createClass({

  // Use getAppState method to set initial state
  getInitialState: function() {
    return this.props;
    // return getAppState();
  },

  // Listen for changes
  componentDidMount: function() {
    TestDataStore.addChangeListener(this._onChange);
  },

  // Unbind change listener
  componentWillUnmount: function() {
    TestDataStore.removeChangeListener(this._onChange);
  },

   // Update view state when change event is received
  _onChange: function() {
    this.setState(getAppState());
  },

  testCreateAction: function(){
    TestDataActions.increaseID();
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