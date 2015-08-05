/** @jsx React.DOM */

var React = require('react/addons');

var PlacePhoto = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

	render: function() {
		var mediaData = this.props.mediaData;

		return (			
			<div className = "place-photo-container">
				<img src={mediaData.images.standard_resolution.url} />
			</div>
		);
	}
});

module.exports = PlacePhoto;