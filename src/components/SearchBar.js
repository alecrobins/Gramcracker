/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var router = require('../router');

var SearchBar = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func.isRequired
 	},

	handleSubmit: function(e){
		e.preventDefault();
		var self = this;
		var searchData = {
			term: React.findDOMNode(this.refs.term).value.trim(),
			location: React.findDOMNode(this.refs.location).value.trim(),
		};

		// if search is empty then get current location
		if(searchData.location === "" && navigator.geolocation){
   	   navigator.geolocation.getCurrentPosition(
   	   	function(position){
   	   		var lat = position.coords.latitude;
   	   		var lng = position.coords.longitude;
   	   		var geocoder = new google.maps.Geocoder();
   	   		var latlng = new google.maps.LatLng(lat, lng);
    
    				geocoder.geocode({'latLng': latlng}, function(results, status) {
      				if (status == google.maps.GeocoderStatus.OK) {
      					var city, state;
      					// set the city and state based on the types from the component
      					for(var i in results[0].address_components){
      						var component = results[0].address_components[i];
      						
      						if(component.types[0] === "administrative_area_level_1"){
      							state = component.long_name;
      						}

      						if(component.types[0] === "locality"){
      							city = component.long_name;
      						}

      					}

      					// reset the location information before sending off search
      					searchData.location = city + ", " + state;

      					completeSearch(); 
      				}
      			});
   	   	});
		}else{
      	completeSearch();		
		}

		var completeSearch = function(){
			// delete the null
			for(var i in searchData){
				if(searchData[i] === ""){
					delete searchData[i];
				}
			}

			// send off the search with searchData as the query
     		self.context.router.transitionTo('search', null, searchData);
		};

	},

	render: function() {
		return (
			<div className = "home--search-container">
			
				<label htmlFor="term">Term</label>
				<input type="text" name="term" ref="term" />
					
				<label htmlFor="location">Location</label>
				<input type="text" name="location" ref="location" />	
					
				<i className="fa  fa-search fa-3x" onClick={this.handleSubmit}></i>

			</div>
		);
	}
});

module.exports = SearchBar;