var Dispatcher = require('flux').Dispatcher;
var VictimDispatcher = new Dispatcher();
var VictimConstants = require('../constants/VictimConstants');
var ActionTypes = VictimConstants.ActionTypes;

module.exports = VictimDispatcher;
