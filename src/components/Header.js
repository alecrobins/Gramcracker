/** @jsx React.DOM */

var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var UserStore = require('../stores/UserStore');
var LoginActions = require('../actions/LoginActions');

// Method to retrieve application state from store
function getAppState() {
  return UserStore.getData();
}

var Header = React.createClass({

	contextTypes: {
   	router: React.PropTypes.func
  	},

	// Use getAppState method to set initial state
	getInitialState: function() {
		return getAppState();
	},

	// Listen for changes
	componentDidMount: function() {
		UserStore.addChangeListener(this._onChange);
	},

	// Unbind change listener
	componentWillUnmount: function() {
		UserStore.removeChangeListener(this._onChange);
	},

	// Update view state when change event is received
	_onChange: function() {
		this.setState(getAppState());
	},

	signin: function(){
	 	LoginActions.signin("this is a username");
	},

	render: function() {
		return (			
			<header className="header">
				<div className="header__wrap -flex">
					<div className="header--logo-container">
						<Link to="home">
							<img className="header--logo__img" src="assets/img/logo.png" alt="Instagrammm logo" />
						</Link>
					</div>

					<div className="header--user-container">
						<a onClick ={this.signin} >Log in</a>
					</div>
				</div>
			</header>
		);
	}
});

module.exports = Header;