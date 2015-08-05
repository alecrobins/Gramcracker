var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchStoreConstants = require('../constants/SearchStoreConstants');

var SearchActions = {

  	search: function(searchData) {
    	AppDispatcher.handleAction({
      	actionType: SearchStoreConstants.SEARCH,
      	searchData: searchData
    	});
  	},

  	isDataLoaded: function(_isDataLoaded) {
    	AppDispatcher.handleAction({
      	actionType: SearchStoreConstants.IS_DATA_LOADED,
      	isDataLoaded: _isDataLoaded
    	});
  	},

};

module.exports = SearchActions;