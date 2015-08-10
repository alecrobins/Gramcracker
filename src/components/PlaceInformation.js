/** @jsx React.DOM */

var React = require('react/addons');

var PlaceInformation = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

  	goToPlace: function(){
     	this.context.router.transitionTo('place', {id: this.props.placeData.id}, null);
  	},

	render: function() {
		var placeData = this.props.placeData;
		var isOpen;

		if(placeData.is_closed){
			isOpen =
				<div className="place-information__open is-closed">
					Closed now
				</div>
		}else{
			isOpen =
				<div className="place-information__open is-open">
					Open now
				</div>
		}

		return (			
			<div className = "place-information">
				
				<h1 onClick={this.goToPlace} className="h1">{this.props.rank} {placeData.name}</h1>
				
				<div className="place-information__rating">
					<img src={placeData.rating_img_url} />
				</div>

				{isOpen}

				<div className="place-information__address">
					<p class="p p__detail">{placeData.location.address[0]}</p>
					<p class="p p__detail">{placeData.location.city}, {placeData.location.state} {placeData.location.postal_code}</p>
				</div>

				<div className="place-information__phone">
					<i class="icon icon__green fa fa-phone"></i>
					{placeData.display_phone}
				</div>

			</div>
		);
	}
});

module.exports = PlaceInformation;