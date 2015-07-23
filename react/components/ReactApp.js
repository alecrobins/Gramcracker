/** @jsx React.DOM */

var React = require('react/addons');
var TestDataStore = require('../stores/TestDataStore');

// Method to retrieve application state from store
function getAppState() {
  return {
    testData: TestDataStore.getData(),
    displayName: "hello this is from the server"
  };
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

  // Render the component
  render: function(){
    return (
    	<div>
      	<h1>This is all a test from the React App</h1>
      	<h2>{this.state.username}</h2>
      	<h3>{this.state.id}</h3>
      </div>
   );
  }
});

module.exports = ReactApp;