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
					<h5 className="h5 h5__red">Closed now</h5>
				</div>
		}else{
			isOpen =
				<div className="place-information__open is-open">
					<h5 className="h5 h5__green">Open now</h5>
				</div>
		}

		return (			
			<div className = "place-information">
				
				<span className="place-information__ranking">{this.props.rank}</span>

				<h1 onClick={this.goToPlace} className="h1 place-information__name">{placeData.name}</h1>
				
				<div className="place-information__rating">
					<img src={placeData.rating_img_url_large} />
				</div>

				{isOpen}

				<div className="place-information__address">
					<p className="p p__detail">{placeData.location.address[0]}</p>
					<p className="p p__detail">{placeData.location.city}, {placeData.location.state_code} {placeData.location.postal_code}</p>
				</div>

				<div className="place-information__phone">
					<i className="icon icon--phone icon--green fa fa-phone"></i>
					<p className="p p__detail p__inline">
						{placeData.display_phone.substring(3, placeData.display_phone.length)}
					</p>
				</div>

			</div>
		);
	}
});

module.exports = PlaceInformation;