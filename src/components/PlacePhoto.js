/** @jsx React.DOM */

var React = require('react/addons');

var PlacePhoto = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

  	handlePhotoClick: function(e){
  		this.props.handlePhotoClick(e.target, this.props.index);
  	},

	render: function() {
		var mediaData = this.props.mediaData;
		var picture=<img data-lazy={mediaData.images.standard_resolution.url} />;

		return (			
			<div className = "place-media--slider__item" onClick={this.handlePhotoClick}>
				{picture}
			</div>
		);
	}
});

module.exports = PlacePhoto;