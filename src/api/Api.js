var SearchStoreConstants = require('../constants/SearchStoreConstants');
var SearchActions = require('../actions/SearchActions');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var Api = {

  // conduct a search with the given paraments
  search: function(data){
    var searchData = {
      location: data.searchQuery.location,
      term: data.searchQuery.term
    }

    $.ajax({
      url: '/api/search',
      data: searchData,
      type: 'POST',
    })
    .done(function(data){
      SearchActions.receiveSearchData(data);
    })
    .fail(function(){
      console.log("FAILED");
      SearchActions.searchError("Failed the search");
    });

  },

};


// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;

  // Define what to do for certain actions
  switch(action.actionType) {
    
    case SearchStoreConstants.SEND_SEARCH:
      Api.search(action);
      break;

    default:
      return true;
  }
  
  return true;

});

module.exports = Api;