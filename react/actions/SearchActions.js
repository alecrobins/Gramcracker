var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchStoreConstants = require('../constants/SearchStoreConstants');

var SearchActions = {

  	search: function(searchData) {
    	AppDispatcher.handleAction({
      	actionType: SearchStoreConstants.SEARCH,
      	searchData: searchData
    	});
  	},

};

module.exports = SearchActions;