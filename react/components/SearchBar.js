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
		// if(searchData.location === "" && navigator.geolocation){
  //  	   navigator.geolocation.getCurrentPosition(
  //  	   	function(position){
  //  	   		var lat = position.coords.latitude;
  //  	   		var lng = position.coords.longitude;
  //  	   		var geocoder = new google.maps.Geocoder();
  //  	   		var latlng = new google.maps.LatLng(lat, lng);
    
  //   				geocoder.geocode({'latLng': latlng}, function(results, status) {
  //     				if (status == google.maps.GeocoderStatus.OK) {
  //     					console.log(results[0].formatted_address);
  //     				}
  //     			});
  //  	   	});
		// }else{
		// 	completeSearch();
		// }

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

		completeSearch();

	},



	render: function() {
		return (
			<div className = "home--search-container">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="term">Term</label>
					<input type="text" name="term" ref="term" />
					
					<label htmlFor="location">Location</label>
					<input type="text" name="location" ref="location" />	
					
					<input type="submit" className="submitForm" />

				</form>
			</div>
		);
	}
});

/**
*
* 					
					<label htmlFor="limit">Limit</label>
					<input type="text" name="limit" ref="limit" />
					
					<label htmlFor="sort">Sort</label>
					<label htmlFor="sort"> 0=Best matched (default), 1=Distance, 2=Highest Rated.</label>
					<input type="text" name="sort" ref="sort" />
					
					<label htmlFor="category_filter">Category Filter</label>
					<input type="text" name="category_filter" ref="category_filter" />
					
					<label htmlFor="radius_filter">Radius Filter</label>
					<input type="text" name="radius_filter" ref="radius_filter" />
					
					<label htmlFor="latitude">Latitude</label>
					<input type="text" name="latitude" ref="lat" />
					
					<label htmlFor="longitude">Longitude</label>
					<input type="text" name="longitude" ref="lng" />
*
**/
	

module.exports = SearchBar;