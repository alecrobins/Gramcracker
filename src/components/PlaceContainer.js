/** @jsx React.DOM */

var React = require('react/addons');
var PlacePhoto = require('./PlacePhoto');
var PlaceInformation = require('./PlaceInformation');
var router = require('../router');
var uuid = require('node-uuid');
var mixins = require('../util/mixins');

var PlaceContainer = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func.isRequired
  	},

  	componentDidMount: function(){
  		var self = this;
  		// set up the slider once component has been mounted
  		$('.place-media--slider[data-place-name="' + this.props.placeData.name +'"]').slick({
  			 lazyLoad: 'ondemand',
  			 dots: true,
  			 arrows: true,
  			 fade: true,
  			 infinite: false,
  			 cssEase: 'linear',
  			 prevArrow: '<span class="slick-prev"><i class="slider__arrow fa fa-chevron-left"></i></span>',
  			 nextArrow: '<span class="slick-next"><i class="slider__arrow fa fa-chevron-right"></i></span>',
  			 appendArrows: '.place-media--slider-nav[data-place-name="' + self.props.placeData.name +'"]',
  			 appendDots: '.place-media--slider-nav[data-place-name="' + self.props.placeData.name +'"]'
  		});
  	},

  	handlePhotoClick: function(target){
  		
  	},

	render: function() {
		var self = this;
		var slider = [];
		
		// split up images into buckets with a max of 5 media items per bucket
		if(this.props.placeData.media !== undefined){
			mixins.each_slice(this.props.placeData.media, 5, function (mediaItem){
				var section = [];
				// make first image an empty filler
				section.push(<div className="place-media--slider__item"></div>);
				
				for(var i in mediaItem){
					section.push(<PlacePhoto key={uuid.v1()} mediaData={mediaItem[i]} 
						handlePhotoClick={self.handlePhotoClick} />)
				};
				slider.push(section);
			});
		}

		return (			
			<div className = "place-container">
				
				<PlaceInformation key={uuid.v1()} placeData={this.props.placeData.place} rank={this.props.rank}/>

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
		      
		      <div className="place-media--slider-nav -flex -flex--center" data-place-name={this.props.placeData.name}></div>

			</div>
		);
	}
});

module.exports = PlaceContainer;