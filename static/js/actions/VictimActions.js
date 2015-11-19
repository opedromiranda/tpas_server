var VictimDispatcher = require('../dispatcher/VictimDispatcher');
var VictimConstants = require('../constants/VictimConstants');

var ActionTypes = VictimConstants.ActionTypes;

module.exports = {
  selectVictim: function (victim) {
    VictimDispatcher.dispatch({
      type: ActionTypes.VICTIM_SELECTED,
      victim: victim
    });
  },
  fetchVictims: function () {
    VictimDispatcher.dispatch({
      type: ActionTypes.VICTIM_FETCH
    })
  }
}
