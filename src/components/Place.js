/** @jsx React.DOM */

var React = require('react/addons');
var PlaceStore = require('../stores/PlaceStore');
var PlaceContainer = require('./PlaceContainer');
var GoogleMap = require('./GoogleMap');
var PlaceActions = require('../actions/PlaceActions');
var uuid = require('node-uuid');

var Place = React.createClass({
	
	contextTypes: {
   	router: React.PropTypes.func
  	},

	// Use getAppState method to set initial state
	getInitialState: function() {
		// send off action to get place data
		PlaceActions.getPlaceData(this.props.params.id);
		return PlaceStore.getData();
	},

	// Listen for changes
	componentDidMount: function() {
		PlaceStore.addChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		PlaceStore.removeChangeListener(this._onChange);
	},

	// Update view state when change event is received
	_onChange: function() {
		this.setState(PlaceStore.getData());
	},

	render: function() {
		var display;

		if($.isEmptyObject(this.state)){
			display = <h1>Loading</h1>;
		}else{
			display =
				<div className = "place-container">
			  		<GoogleMap placeData = {this.state} type = {"single"} />
			   	<PlaceContainer key={uuid.v1()} placeData={this.state} />
			   </div>;
		}

		return (
			<div className="PlaceView">
				{display}
			</div>
		);
	}
	
});

module.exports = Place;