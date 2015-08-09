/** @jsx React.DOM */

var React = require('react/addons');
var uuid = require('node-uuid');

var GoogleMap = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func.isRequired
  	},

	initMapSingle: function(){
  		var placeData = this.props.placeData;
		
		var location = 
	  			{
	  				lat: placeData.place.location.coordinate.latitude,
	  				lng: placeData.place.location.coordinate.longitude
	  			};

		var mapOptions = {
			zoom: 15,
			scrollwheel: false,
			center: new google.maps.LatLng(location.lat,location.lng),
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

	  	var map = new google.maps.Map(React.findDOMNode(this.refs.mapNode), mapOptions);
  		
  		// add market to map
  		var marker = new google.maps.Marker({
	    	position: location,
	    	animation: google.maps.Animation.DROP,
	    	map: map,
	    	title: placeData.name
	  	});

	  	var latLng = marker.getPosition();
		map.setCenter(latLng);
	},

  	initMapList: function(){
  		var mapOptions = {
			panControl: true,
			scrollwheel: false,
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

	  	var map = new google.maps.Map(React.findDOMNode(this.refs.mapNode), mapOptions);
  		
  		var placeData = this.props.placeData;
  		var markers = [];

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
		    	animation: google.maps.Animation.DROP,
		    	map: map,
		    	title: placeData[i].name
		  	});

			markers.push(marker);
	  	}

	  	// center the map around the bounds
	  	var bounds = new google.maps.LatLngBounds();

		for(i=0;i<markers.length;i++) {
			bounds.extend(markers[i].getPosition());
		}

		map.fitBounds(bounds);
  	},

  	componentDidMount: function(){
  		if(this.props.type === "list"){
	  		this.initMapList();
  		}

  		if(this.props.type === "single"){
	  		this.initMapSingle();
  		}
  	},

	render: function() {
		var self = this;

		return (			
			<div className = "map-container" ref="mapNode">
			</div>
		);
	}

});

module.exports = GoogleMap;