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
				
				<Link to="home">
					<h1>Instagrammm</h1>
				</Link>

				<div className="header__user">
					<a onClick ={this.signin} > Log in </a>
				</div>

				<Link to="place"> Place </Link>

			</header>
		);
	}
});

module.exports = Header;