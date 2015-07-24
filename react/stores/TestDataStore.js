var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var TestDataConstants = require('../constants/TestDataConstants');

// Internal object of our object
var _testData = {};

// Method to load shoes from action data
function loadData(data) {
  _testData = data.testData;
}

function incrementID(){
  console.log("increaseID");
  _testData.id = _testData.id + 1;
}

// Merge our store with Node's Event Emitter
var TestDataStore = assign(EventEmitter.prototype, {

  // Returns all shoes
  getData: function() {
    return _testData;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  // Define what to do for certain actions
  switch(action.actionType) {
    case TestDataConstants.LOAD_DATA:
      // Call internal method based upon dispatched action
      loadData(action.data);
      break;

    case TestDataConstants.INCR_ID:
      incrementID();
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  TestDataStore.emitChange();

  return true;

});

module.exports = TestDataStore;