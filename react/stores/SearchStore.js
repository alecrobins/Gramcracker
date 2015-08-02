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

  setData: function(data) {
    console.log("DATA LOADED");
    _searchData = $.extend({}, data[0]);;
  },

  // conduct a search with the given paraments
  search: function(searchData){

    // reset the search data
    _searchData = {};

    var self = this;

    $.ajax({
      url: '/api/search',
      data: searchData,
      type: 'POST',
    })
    .done(function(data){

      console.log("DATA RETURNED");

      self.setData(data);
      self.setIsDataLoaded(true);

      SearchStore.emitChange();

    })
    .fail(function(){
      console.log("FAILED");
    });

  },

};

// Merge our store with Node's Event Emitter
var SearchStore = assign(EventEmitter.prototype, {

  // Returns all 
  getData: function() {
    console.log("GET _ DATA");
    console.log(_searchData);
    return _searchData;
  },

  // TEST
  returnData: function(){
    return _searchData;
  },

  // Returns all place
  getPlace: function(placeID) {
    
    if($.isEmptyObject(_searchData)){
      return null;
    }

    // NOTE: could be optimized to O(1) not O(n)
    for(var i in _searchData){
      if(_searchData[i].id === placeID){
        return _searchData[i]
      }
    }

    return null;

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
  //SearchStore.emitChange();

  return true;

});

module.exports = SearchStore;