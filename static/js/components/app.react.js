var React = require('react');
var VictimStore = require('../store/VictimStore');
var VictimsList = require('./victims-list.react');
var VictimsCommandInput = require('./victim-command-input.react');

function getStateFromStore() {
  var storeState = VictimStore.get();
  return {
    victim: storeState.get('selected')
  };
}

var App = React.createClass({

  getInitialState: function () {
    return getStateFromStore();
  },

  componentDidMount: function () {
    VictimStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    VictimStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(getStateFromStore());
  },

  render: function () {
    return (
      <span>
        <VictimsList />
        {function () {
          if (this.state.victim) {
            var commandInputStyle = { marginTop: 50, backgroundColor: '#FF0', textAlign: 'center' };
            return <VictimsCommandInput style={commandInputStyle} />
          }
        }.call(this)}
      </span>
    )
  }
});

module.exports = App;
