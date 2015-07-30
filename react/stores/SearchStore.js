/** @jsx React.DOM */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SearchStoreConstants = require('../constants/SearchStoreConstants');

console.log(SearchStoreConstants);

// Internal object of our object
var _searchData = {};

// Method to load shoes from action data
function loadData(data) {
  console.log("DATA LOADED");
  console.log(data);
  _searchData = data.searchData;
}

// conduct a search with the given paraments
function search(searchData){
  console.log("SENDING OFF");
  $.ajax({
    url: '/api/search',
    data: searchData,
    type: 'POST',
  }).done(function(data){
    console.log("IT WORKED");
    console.log(data);
  }).fail(function(){
    console.log("FAILED");
  })
}

// Merge our store with Node's Event Emitter
var SearchStore = assign(EventEmitter.prototype, {

  // Returns all shoes
  getData: function() {
    return _searchData;
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
    case SearchStoreConstants.SEARCH:
      search(action.searchData);
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  SearchStore.emitChange();

  return true;

});

module.exports = SearchStore;