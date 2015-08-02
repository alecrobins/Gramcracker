/** @jsx React.DOM */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SearchStore = require('./SearchStore');
var PlaceStoreConstants = require('../constants/SearchStoreConstants');
var router = require('../router');

// Internal object of our object
var _placeData = {};

// Method to load shoes from action data
var _place = {

  setData: function(data) {
    _placeData = $.extend({}, data);;
  },

  // conduct a search with the given paraments
  setPlaceData: function(_placeID){
    
    var self = this;
    var place = SearchStore.getPlace(_placeID);

    if(place === null){
      $.ajax({
        url: '/api/place',
        data: {placeID: _placeID},
        type: 'POST',
      })
      .done(function(data){
        
        console.log("RECIEVED ON CLIENT");

        self.setData(data[0]);

        PlaceStore.emitChange();

      })
      .fail(function(){
        console.log("FAILED GET BUSINESS");
      });
    }else{
      // place already exists in the store
      console.log("CACHED");
      self.setData(place);
      PlaceStore.emitChange();
    }

  },

};

// Merge our store with Node's Event Emitter
var PlaceStore = assign(EventEmitter.prototype, {

  // Returns all shoes
  getData: function() {
    return _placeData;
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
    
    case PlaceStoreConstants.GET_DATA:
      _place.setPlaceData(action.placeID);
      break;

    default:
      return true;
  }

  PlaceStore.emitChange();

  return true;

});

module.exports = PlaceStore;