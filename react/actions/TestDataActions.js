var AppDispatcher = require('../dispatcher/AppDispatcher');
var TestDataStoreConstants = require('../constants/TestDataConstants');

var TestDataActions = {

  loadData: function(data) {
    AppDispatcher.handleAction({
      actionType: TestDataStoreConstants.LOAD_DATA,
      data: data
    });
  }
};

module.exports = TestDataActions;