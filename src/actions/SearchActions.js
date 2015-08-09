var AppDispatcher = require('../dispatcher/AppDispatcher');
var SearchStoreConstants = require('../constants/SearchStoreConstants');

var SearchActions = {

    searchError: function(error){
      AppDispatcher.handleAction({
        actionType: SearchStoreConstants.SEARCH_ERROR,
        error: error
      });
    },

    receiveSearchData: function(searchData){
      AppDispatcher.handleAction({
        actionType: SearchStoreConstants.SEND_SEARCH_COMPLETED,
        searchData: searchData
      });
    },

  	sendSearchData: function(searchQuery) {
    	AppDispatcher.handleAction({
      	actionType: SearchStoreConstants.SEND_SEARCH,
      	searchQuery: searchQuery
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