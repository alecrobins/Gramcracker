/** @jsx React.DOM */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SearchStoreConstants = require('../constants/SearchStoreConstants');
var router = require('../router');

// Internal object of our object
var _searchData = {};
var _isDataLoaded = false;

// Method to load shoes from action data
var _search = {

  setIsDataLoaded: function(isDataLoaded){
    _isDataLoaded = isDataLoaded;
  },

  loadData: function(data) {
    console.log("DATA LOADED");
    console.log(data);
    _searchData = data.searchData;
  },

  // conduct a search with the given paraments
  search: function(searchData){
    console.log("SENDING OFF");
    $.ajax({
      url: '/api/search',
      data: searchData,
      type: 'POST',
    }).done(function(data){
      console.log("IT WORKED");
      console.log(data);
      router.transitionTo('place', null, null);
    }).fail(function(){
      console.log("FAILED");
    });
  },

};

// Merge our store with Node's Event Emitter
var SearchStore = assign(EventEmitter.prototype, {

  // Returns all shoes
  getData: function() {
    return _searchData;
  },

  // Returns if the data has been loaded
  isDataLoaded: function(){
    return _isDataLoaded;
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
      _search.search(action.searchData);
      break;

    case SearchStoreConstants.IS_DATA_LOADED:
      _search.setIsDataLoaded(action.isDataLoaded);
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  SearchStore.emitChange();

  return true;

});

module.exports = SearchStore;