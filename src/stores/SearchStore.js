/** @jsx React.DOM */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SearchStoreConstants = require('../constants/SearchStoreConstants');
var router = require('../router');

// Internal object of our object
var _searchData = {};
var _fetchingState = "idle";
// flag to determine is a search has been fired off yet
var _isLoaded = false;

// Method to load shoes from action data
var _search = {

  setData: function(data) {
    // clear the previously cached search data
    var newData = data.searchData[0];
    // remove places that do not have any pictures 
    for(var i in newData){

      if(newData[i].media.length === 0){
        delete newData[i];
      }
    }

    _searchData = $.extend({}, newData);
  },

  setFetchingState: function(state){
    _fetchingState = state;
  },

  getFetchingState: function(){
    return _fetchingState;
  },

  getSearchData: function(){
    return _searchData;
  },

  getPlace: function(placeID){
    if($.isEmptyObject(_searchData)){ return null; }

    // TODO: could be optimized to O(1) not O(n)
    for(var i in _searchData){
      if(_searchData[i].id === placeID){
        return _searchData[i]
      }
    }

    return null;
  }

};

// Merge our store with Node's Event Emitter
var SearchStore = assign(EventEmitter.prototype, {

  getData: function(){
    return _search.getSearchData();
  },

  returnData: function(){
    return _searchData;
  },

  getFetchingState: function(){
    return _search.getFetchingState();
  },

  // Returns all place
  getPlace: function(placeID) {
    return _search.getPlace(placeID);
  },

  sendSearchStarted: function(){
    _isLoaded = true;

    // clear the previously cached search data
    _searchData = {};
    _search.setFetchingState("fetching");
  },

  isLoaded: function(){
    return _isLoaded;
  },
  
  sendSearchCompleted: function(data){
    _search.setData(data);
    _search.setFetchingState("idle");
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
    
    case SearchStoreConstants.SEND_SEARCH:
      SearchStore.sendSearchStarted();
      break;

    case SearchStoreConstants.SEND_SEARCH_COMPLETED:
      SearchStore.sendSearchCompleted(action);
      break;

    default:
      return true;
  }
  
  // If action was acted upon, emit change event
  SearchStore.emitChange();

  return true;

});

module.exports = SearchStore;