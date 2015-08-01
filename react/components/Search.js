/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');

var Search = React.createClass({
	// Use getAppState method to set initial state
	getInitialState: function() {
		return SearchStore.getData();
	},

	// Listen for changes
	componentDidMount: function() {
		SearchStore.addChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		SearchStore.removeChangeListener(this._onChange);
	},

	// Update view state when change event is received
	_onChange: function() {
		this.setState(SearchStore.getData());
	},



	// Render the component
	render: function(){
	 	return (
	 		<div>
		   	<div className = "places" >
		   		{listItems}
		   	</div>
	   	</div>
		);
	}
	
});

module.exports = Search;