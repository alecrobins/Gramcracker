/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var SearchSuggestions = require("./SearchSuggestions");
var router = require('../router');

var SearchBar = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func.isRequired
 	},

 	componentDidMount: function() {
      $(".searchbar--input").on('keydown', this.handleSearchKeyDown);
   },

   componentWillUnMount: function() {
      $(".searchbar--input").off('keydown', this.handleSearchKeyDown);
   },

   handleSearchKeyDown: function(e){
   	// search on enter
   	if(e.keyCode === 13){
   		this.handleSubmit(e);
   	}

      // TODO: implement suggetions
      // var data = {
      //    prefix: "new"
      // }

      // $.ajax({
      //    url: '/api/search_suggest',
      //    type: 'GET'
      // }).done(function(data){
      //    var bodyData = JSON.parse(data[0].replace(/.*?;{/, "{"));
      //    var body = bodyData.body.replace(/(\r\n|\n|\r)/gm,"").replace(/class=/g, 'className=');;
      // }).fail(function(){
      //    console.log("FAIL");
      // });
   },

	handleSubmit: function(e){
		e.preventDefault();
		var self = this;

		var searchData = {
			term: React.findDOMNode(this.refs.term).value.trim(),
         location: React.findDOMNode(this.refs.location).value.trim(),
		};

      // TODO: need to convert enum (0, 1, 2)
      if(!this.props.isHome){
         searchData.filterBy = React.findDOMNode(this.filterBy.location).value.trim();
      }

		var completeSearch = function(){
			// delete the null
			for(var i in searchData){
				if(searchData[i] === ""){
					delete searchData[i];
				}
			}
         // send off search action
         SearchActions.sendSearchData(searchData);
			// change routes 
     		self.context.router.transitionTo('search', null, searchData);
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


	},

	render: function() {
      var searchClass = this.props.isHome ? "searchbar -flex is-home" : "searchbar -flex";
      var filterBy = "";
      var searchWrap = "";

      if(!this.props.isHome){
         filterBy = 
            <div className="searchbar--filter searchbar--input-container">
               <input className="searchbar--input" type="text" name="filterBy" ref="filterBy" />
            </div>;

         searchWrap = "searchbar--wrap";
      }

		return (
         <div className = {searchWrap} >
   			<div className = {searchClass}>
   				
   				<div className="searchbar--term searchbar--input-container">
   					<input className="searchbar--input" type="text" name="term" ref="term" />
   				</div>

   				<div className="searchbar--location searchbar--input-container">
   					<input className="searchbar--input" type="text" name="location" ref="location" />
   				</div>
   				
               {filterBy}

   				<i className="searchbar--icon icon fa fa-search fa-2x" onClick={this.handleSubmit}></i>

   			</div>
         </div>
		);
	}
});

module.exports = SearchBar;