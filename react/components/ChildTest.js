/** @jsx React.DOM */

var React = require('react/addons');
var TestDataActions = require('../actions/TestDataActions.js');

var ChildTest = React.createClass({

  // Render the component
  render: function(){
    return (
    	<div>
      	<h1>FROME THE CHILD</h1>
      	<h3>{this.props.thisID}</h3>
      </div>
   );
  }
});

module.exports = ChildTest;