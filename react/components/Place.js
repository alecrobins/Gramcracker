/** @jsx React.DOM */

var React = require('react/addons');

var Place = React.createClass({
	contextTypes: {
   	router: React.PropTypes.func
  	},

	render: function() {
		return (
			<div className="PlaceView">Place View</div>
		);
	}
});

module.exports = Place;