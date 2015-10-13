/** @jsx React.DOM */

var React = require('react/addons');

var MediaSlider = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

	render: function() {
		var display;
		
		if(this.props.display){
			display = 
				<div className="media-slider--wrap">
					<div className="media-slider--container">
						<h1>Media from the slider will go here </h1>
						<h2>Create a new slick slider with each media slider photo </h2>
					</div>
				</div>
		}else{
			display = <div>~~Hidden~~</div>
		}

		return (		
			<div>	
				{display}
			</div>
		);
	}
});

module.exports = MediaSlider;