/** @jsx React.DOM */

var React = require('react/addons');
var SearchActions = require('../actions/SearchActions');
var SearchStore = require('../stores/SearchStore');

var Search = React.createClass({

	handleSubmit: function(e){
		e.preventDefault();

		var searchData = {
			term: React.findDOMNode(this.refs.term).value.trim(),
			limit: React.findDOMNode(this.refs.limit).value.trim(),
			sort: React.findDOMNode(this.refs.sort).value.trim(),
			category_filter: React.findDOMNode(this.refs.category_filter).value.trim(),
			radius_filter: React.findDOMNode(this.refs.radius_filter).value.trim(),
			location: React.findDOMNode(this.refs.location).value.trim(),
			lat: React.findDOMNode(this.refs.lat).value.trim(),
			lng: React.findDOMNode(this.refs.lng).value.trim(),
		};

		console.log("started the search");

		// send off the search
		SearchActions.search(searchData);

		// TODO: need to start the loading 

	},

	render: function() {
		return (
			<div className = "SearchView">
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="term">Term</label>
					<input type="text" name="term" ref="term" />

					<label htmlFor="limit">Limit</label>
					<input type="text" name="limit" ref="limit" />
					
					<label htmlFor="sort">Sort</label>
					<label htmlFor="sort"> 0=Best matched (default), 1=Distance, 2=Highest Rated.</label>
					<input type="text" name="sort" ref="sort" />
					
					<label htmlFor="category_filter">Category Filter</label>
					<input type="text" name="category_filter" ref="category_filter" />
					
					<label htmlFor="radius_filter">Radius Filter</label>
					<input type="text" name="radius_filter" ref="radius_filter" />
					
					<label htmlFor="location">Location</label>
					<input type="text" name="location" ref="location" />
					
					<label htmlFor="latitude">Latitude</label>
					<input type="text" name="latitude" ref="lat" />
					
					<label htmlFor="longitude">Longitude</label>
					<input type="text" name="longitude" ref="lng" />
					
					<input type="submit" className="submitForm" />

				</form>
			</div>
		);
	}
});

module.exports = Search;