/** @jsx React.DOM */

var React = require('react/addons');
var SearchBar = require('./SearchBar');

var HomePage = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func.isRequired
 	},

	render: function() {
		return (
			<div className = "homepage--container">
				<SearchBar />
			</div>
		);
	}
});

module.exports = HomePage;