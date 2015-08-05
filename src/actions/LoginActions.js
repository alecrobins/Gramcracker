var AppDispatcher = require('../dispatcher/AppDispatcher');
var UserStoreConstants = require('../constants/UserStoreConstants');

var LoginActions = {

  	signin: function(data) {
    	AppDispatcher.handleAction({
      	actionType: UserStoreConstants.SIGN_IN,
      	data: data
    	});
  	},

  	signout: function() {
   	  AppDispatcher.handleAction({
        actionType: UserStoreConstants.SIGN_OUT,
    	});
  	},

};

module.exports = LoginActions;