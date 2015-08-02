/** @jsx React.DOM */

var React = require('react/addons');
var PlaceStore = require('../stores/PlaceStore');
var PlaceContainer = require('./PlaceContainer');
var PlaceActions = require('../actions/PlaceActions');

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

		console.log(this.state);

		if($.isEmptyObject(this.state)){
			display = <h1>Loading</h1>;
		}else{
			display =
				<div className = "place-container">
					<h3>{params.id}</h3>
			   	<PlaceContainer key={self.state.id} placeData={self.state[i]} />
			   </div>;
		}

		return (
			<div className="PlaceView">
				<h1>Place View</h1>
				{display}
			</div>
		);
	}
	
});

module.exports = Place;