/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');
var SearchBar = require('./SearchBar');
var PlaceContainer = require('./PlaceContainer');
var GoogleMap = require('./GoogleMap');
var uuid = require('node-uuid');
var router = require('../router');

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

	// Render the component
	render: function(){
		window.testSearchStore = SearchStore;

		var display;
		var self = this;
		if (SearchStore.getFetchingState() === "fetching") {
		  
		  display = <h1>Loading</h1>;

		} else {
		  display =
		   <div className = "places" >
		  		<GoogleMap placeData = {this.state} type = {"list"} />
		  		<SearchBar isHome = {false} queryParams = {this.props.query} />
		  		<div className = "results-container">
			  		{Object.keys(this.state).map(function(i){
			         return (
			         	<PlaceContainer key={uuid.v1()} placeData={self.state[i]} />
			         )
			      })}
		  		</div>
		  	</div>
		  	;
		}
 	
	 	return (
	 		<div>
		   	{display}
	   	</div>
		);
	}
	
});

module.exports = Search;