/** @jsx React.DOM */

var React = require('react/addons');

var PlacePhoto = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

	render: function() {
		var mediaData = this.props.mediaData;

		var picture=<img src={mediaData.images.standard_resolution.url} />;

		return (			
			<div className = "place-media--slider__item">
				{picture}
			</div>
		);
	}
});

module.exports = PlacePhoto;