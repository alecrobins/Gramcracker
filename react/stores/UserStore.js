var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var UserStoreConstants = require('../constants/UserStoreConstants');

// Internal object of our object
var _userData = {};

// Load user data from action
function loadData(data) {
  _userData = data.userData;
}

// Load user data from action
function clearData(data) {
  _userData = data.userData;
}

// Merge our store with Node's Event Emitter
var UserStore = assign(EventEmitter.prototype, {

  // Returns all shoes
  getData: function() {
    return _userData;
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

  // Define what to do for certain actions
  switch(action.actionType) {
    case UserStoreConstants.SIGN_IN:
      // Call internal method based upon dispatched action
      loadData(action.data);
      break;

    case UserStoreConstants.SIGN_OUT:
      clearData();
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  UserStore.emitChange();

  return true;

});

module.exports = UserStore;