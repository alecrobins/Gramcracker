/** @jsx React.DOM */

var React = require('react/addons');
var uuid = require('node-uuid');

var GoogleMap = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func.isRequired
  	},

  	initMap: function(){
  		var placeData = this.props.placeData;
  		var markers = [];

  		var mapOptions = {
			panControl: true,
			panControlOptions: {
   	     position: google.maps.ControlPosition.LEFT_BOTTOM
			},
			zoomControl: true,
			zoomControlOptions: {
		   	style: google.maps.ZoomControlStyle.SMALL,
   	    	position: google.maps.ControlPosition.RIGHT_BOTTOM
		  	},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false
	  };

	  var map = new google.maps.Map(React.findDOMNode(this.refs.mapNode),
	      mapOptions);

	  for(var i in placeData){
	  		var place = placeData[i].place.location;
	  		var location = 
	  			{
	  				lat: place.coordinate.latitude,
	  				lng: place.coordinate.longitude
	  			};
	  		// add market to map
	  		var marker = new google.maps.Marker({
		    	position: location,
		    	label: i,
		    	animation: google.maps.Animation.DROP,
		    	map: map,
		    	title: placeData[i].name
		  	});


		  var infowindow = new google.maps.InfoWindow({
		      content: "<div>This is a test</div>"
		  });

		  	google.maps.event.addListener(marker, 'click', toggleBounce);
			google.maps.event.addListener(marker, 'hover', function() {
		   	infowindow.open(map,marker);
		 	});


			function toggleBounce() {

			  if (marker.getAnimation() != null) {
			    marker.setAnimation(null);
			  } else {
			    marker.setAnimation(google.maps.Animation.BOUNCE);
			  }
			}

			markers.push(marker);
	  }

	  	var bounds = new google.maps.LatLngBounds();
		
		for(i=0;i<markers.length;i++) {
			bounds.extend(markers[i].getPosition());
		}

		map.fitBounds(bounds);

	  this.setState({map: map});
  	},

  	componentDidMount: function(){
  		this.initMap();
  	},

	render: function() {
		var self = this;

		return (			
			<div className = "map-container" ref="mapNode">
				<h1>I am a map</h1>
			</div>
		);
	}
});

module.exports = GoogleMap;