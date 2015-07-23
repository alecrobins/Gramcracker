/** @jsx React.DOM */

var React = require('react/addons');
var TestDataStore = require('../stores/TestDataStore');

// Method to retrieve application state from store
function getAppState() {
  return {
    testData: TestDataStore.getData()
  };
}

var ReactApp = React.createClass({
  
  displayName: "HelloWorld",

  // Use getAppState method to set initial state
  getInitialState: function() {
    return getAppState();
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
      	<h2>{this.state.testData}</h2>
      </div>
   );
  }
});

module.exports = ReactApp;