var AppDispatcher = require('../dispatcher/AppDispatcher');
var PlaceStoreConstants = require('../constants/SearchStoreConstants');

var PlaceActions = {

  	getPlaceData: function(_placeID) {
    	AppDispatcher.handleAction({
      	actionType: PlaceStoreConstants.GET_DATA,
      	placeID: _placeID
    	});
  	}

};

module.exports = PlaceActions;