/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');

var Search = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func
  	},
	
	// Use getAppState method to set initial state
	getInitialState: function() {
		// TODO need to check that query is legitimate
		// perform api search
		SearchActions.search(this.props.query);
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

		// TODO: check if data has been loaded
	},

	// Render the component
	render: function(){
		// get the query
		console.log(this.state);
	 	return (
	 		<div>
		   	<div className = "places" >
		   		<h1> Places </h1>
		   	</div>
	   	</div>
		);
	}
	
});

module.exports = Search;