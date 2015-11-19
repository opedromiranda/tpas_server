var VictimDispatcher = require('../dispatcher/VictimDispatcher');
var VictimConstants = require('../constants/VictimConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');
var $ = require('jquery');

var ActionTypes = VictimConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var victimData = Immutable.Map({
  victims: [],
  selected: undefined
});

function _updateSelected(selectedVictim) {
  victimData = victimData.set('selected', selectedVictim);
  VictimStore.emitChange();
}

function _fetchVictims() {
  $.get('/api/victims', function (result) {
    victimData = victimData.set('victims', result);
    VictimStore.emitChange();
  });
}
var VictimStore = assign({}, EventEmitter.prototype, {

  emitChange: function () {
    this.emit(CHANGE_EVENT)
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function () {
    return victimData;
  }
});

VictimStore.dispatchToken = VictimDispatcher.register(function (action) {

  switch (action.type) {
    case ActionTypes.VICTIM_SELECTED:
      _updateSelected(action.victim);
      break;
    case ActionTypes.VICTIM_FETCH:
      _fetchVictims();
      break;
  }
});

module.exports = VictimStore;
