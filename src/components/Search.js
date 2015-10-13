/** @jsx React.DOM */

var React = require('react/addons');
var uuid = require('node-uuid');
var router = require('../router');

var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');
var Api = require('../api/Api');

// components
var SearchBar = require('./SearchBar');
var PlaceContainer = require('./PlaceContainer');
var GoogleMap = require('./GoogleMap');
var MediaSlider = require('./MediaSlider');

var Search = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func.isRequired
  	},
	
	// Use getAppState method to set initial state
	getInitialState: function() {
		return SearchStore.returnData();
	},

	componentWillReceiveProps: function(nextProps) {
		this.getEntityDataIfNeeded();
	},

	componentWillMount: function(){
		// request data if search store hasn't loaded any data yet
		if(!SearchStore.isLoaded()){
			
			var searchData = {
				location: this.props.query.location,
				term: this.props.query.term,
			};

         SearchActions.sendSearchData(searchData);
		}
	},

	// Listen for changes
	componentDidMount: function() {
		SearchStore.addChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		SearchStore.removeChangeListener(this._onChange);
	},

	getEntityDataIfNeeded: function(props) {
      // props changed !
    },

	// Update view state when change event is received
	_onChange: function() {
		this.setState(SearchStore.returnData());
	},

	// TODO: need to send an event once the media slider has been activated

	// Render the component
	render: function(){
		window.testSearchStore = SearchStore;

		var display;
		var self = this;
		var mediaSliderData = SearchStore.getMediaSliderData();

		console.log("Search.js - test");
		console.log(mediaSliderData);
		
		if (SearchStore.getFetchingState() === "fetching") {
		  
		  display = <h1>Loading</h1>;

		} else {
		  display =
		   <div className = "places" >
		  		<GoogleMap placeData = {this.state} type = {"list"} />
		  		<SearchBar isHome = {false} queryParams = {this.props.query} />
		  		<div className = "place-wrap">
			  		{Object.keys(this.state).map(function(i){
			  			var rank = parseInt(i) + 1;
			         return (
			         	<PlaceContainer key={uuid.v1()} placeData={self.state[i]} rank={rank} />
			         )
			      })}
		  		</div>
		  	</div>
		  	;
		}
 		
	 	return (
	 		<div>
		   	{display}
		   	<MediaSlider display={mediaSliderData.display} data={mediaSliderData.data} currentIndex={mediaSliderData.currentIndex} />
	   	</div>
		);
	}
	
});

module.exports = Search;