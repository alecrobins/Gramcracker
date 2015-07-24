/** @jsx React.DOM */

var React = require('react/addons');
var TestDataStore = require('../stores/TestDataStore');
var TestDataActions = require('../actions/TestDataActions.js');
var ChildTest = require('./ChildTest');

// Method to retrieve application state from store
function getAppState() {
  return TestDataStore.getData();
}

var ReactApp = React.createClass({

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
      	<h1>This is all a test from the React App</h1>
      	<h2>{this.state.username}</h2>
      	<h3>{this.state.id}</h3>
        <h4 onClick={this.testCreateAction}> Click me to increase the id </h4>
        <ChildTest thisID= {this.state.id} />
      </div>
   );
  }
});

module.exports = ReactApp;

// render the app with the passed in data once initiated
if (typeof window !== 'undefined') {
    var props = JSON.parse(document.getElementById("props").innerHTML);
    React.render(
        React.createElement(ReactApp, props),
        document.getElementById('react-main-mount')
    );
}