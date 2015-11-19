var React = require('react');
var $ = require('jquery');
var VictimActions = require('./actions/VictimActions');
var App = require('./components/app.react');

window.React = React;
window.$ = $;

VictimActions.fetchVictims();

React.render(
  <App />,
  document.getElementById('react')
);
