/** @jsx React.DOM */

var React = require('react/addons');

var Search = React.createClass({
	render: function() {
		return (
			<div className = "SearchView">
				<form>
					<label htmlFor="term">Term</label>
					<input type="text" name="term" />

					<label htmlFor="limit">Limit</label>
					<input type="text" name="limit" />
					
					<label htmlFor="sort">Sort</label>
					<label htmlFor="sort"> 0=Best matched (default), 1=Distance, 2=Highest Rated.</label>
					<input type="text" name="sort" />
					
					<label htmlFor="category_filter">Category Filter</label>
					<input type="text" name="category_filter" />
					
					<label htmlFor="radius_filter">Radius Filter</label>
					<input type="text" name="radius_filter" />
					
					<label htmlFor="location">Location</label>
					<input type="text" name="location" />
					
					<label htmlFor="latitude">Latitude</label>
					<input type="text" name="latitude" />
					
					<label htmlFor="longitude">Longitude</label>
					<input type="text" name="longitude" />
					
					<input type="submit" className="submitForm" />

				</form>
			</div>
		);
	}
});

module.exports = Search;