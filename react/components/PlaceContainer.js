/** @jsx React.DOM */

var React = require('react/addons');
var PlacePhoto = require('./PlacePhoto');
var router = require('../router');
var uuid = require('node-uuid');

var PlaceContainer = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

  	goToPlace: function(){
  		console.log(this.props);
     	router.transitionTo('place', {id: this.props.placeData.id}, null);
  	},

	render: function() {
		var self = this;

		return (			
			<div className = "place-container">
				<div className = "place-information">
					<h1 onClick={this.goToPlace}> {this.props.placeData.name} </h1>
				</div>

				<div className = "place-media">
				{$.map(this.props.placeData.media, function(mediaItem) {
		         return (
		         	<PlacePhoto key={uuid.v1()} mediaData={mediaItem} />
		         )
		      })}
		      </div>

			</div>
		);
	}
});

module.exports = PlaceContainer;