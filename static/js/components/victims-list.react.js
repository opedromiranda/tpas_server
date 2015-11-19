var React = require('react');
var Paper = require('material-ui/lib/paper');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var ContentInbox = require('material-ui/lib/svg-icons/content/inbox');

var VictimActions = require('../actions/VictimActions');
var VictimStore = require('../store/VictimStore');

var SELECTED_STYLES = {
  backgroundColor: '#DDD'
}

function getStateFromStore() {
  var storeState = VictimStore.get();
  return {
    victims: storeState.get('victims'),
    selected: storeState.get('selected')
  };
}

var VictimsList = React.createClass({

  getInitialState: function () {
    return getStateFromStore();
  },

  handleTap: function (victim) {
    VictimActions.selectVictim(victim);
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
      <Paper zDepth={1}>
      <List>
      {
        this.state.victims.map((victim, index) => {
          var style = victim === this.state.selected ? SELECTED_STYLES : {};

          var boundTap = this.handleTap.bind(this, victim);
          return  <ListItem
            style={style}
            key={index}
            primaryText={victim.ip}
            leftIcon={<ContentInbox />}
            onTouchTap={boundTap}
            onMouseDown={boundTap} />
        })
      }
      </List>
      </Paper>
    )
  }
});

module.exports = VictimsList;
