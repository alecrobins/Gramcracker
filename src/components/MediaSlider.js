/** @jsx React.DOM */

var React = require('react/addons');

var MediaSlider = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

  	componentWillMount: function(){

	},

	render: function() {
		var display;
		var currentImage = this.props.data[this.props.currentIndex];
		
		
		if(this.props.display){
			display = 
				<div className="media-slider--wrap">
					<div className="media-slider--container">
						{currentImage.link}
					</div>
				</div>
		}else{
			display = <div></div>
		}

		return (		
			<div>	
				{display}
			</div>
		);
	}
});

module.exports = MediaSlider;