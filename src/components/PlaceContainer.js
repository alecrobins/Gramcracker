/** @jsx React.DOM */

var React = require('react/addons');
var PlacePhoto = require('./PlacePhoto');
var router = require('../router');
var uuid = require('node-uuid');
var mixins = require('../util/mixins');

var PlaceContainer = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func.isRequired
  	},

  	goToPlace: function(){
     	this.context.router.transitionTo('place', {id: this.props.placeData.id}, null);
  	},

  	componentDidMount: function(){
  		// set up the slider once component has been mounted
  		$('.place-media--slider[data-place-name="' + this.props.placeData.name +'"]').slick();
  	},

	render: function() {
		var self = this;
		var slider = [];
		
		// split up images into buckets with a max of 5 media items per bucket
		if(this.props.placeData.media !== undefined){
			mixins.each_slice(this.props.placeData.media, 5, function (mediaItem){
				var section = [];
				for(var i in mediaItem){
					section.push(<PlacePhoto key={uuid.v1()} mediaData={mediaItem[i]} />)
				};
				slider.push(section);
			});
		}

		return (			
			<div className = "place-container">
				<div className = "place-information">
					<h1 onClick={this.goToPlace}>{this.props.placeData.name}</h1>
				</div>

				<div className = "place-media--slider" data-place-name={this.props.placeData.name}>
					{$.map(slider, function(section) {
		         	return (
		      	   	<div className="place-media--slider__section" key={uuid.v1()}>
		      	   		{$.map(section, function(Item) {
		      	   			return Item;
		      	   		})}
		      	   	</div>
		   	      )
		 	     	})}
		      </div>

			</div>
		);
	}
});

module.exports = PlaceContainer;