var AppDispatcher = require('../dispatcher/AppDispatcher');
var UIConstants = require('../constants/UIConstants');

var UIActions = {

  	openSlider: function(_mediaData, _currentIndex) {
      console.log("OPENING SLIDER ACTION");
    	AppDispatcher.handleAction({
      	actionType: UIConstants.OPEN_SLIDER,
      	mediaData: _mediaData,
      	currentIndex: _currentIndex
    	});
  	},

  	closeSlider: function() {
    	AppDispatcher.handleAction({
      	actionType: UIConstants.CLOSE_SLIDER,
    	});
  	}

};

module.exports = UIActions;