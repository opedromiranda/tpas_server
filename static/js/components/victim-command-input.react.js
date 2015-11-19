var React = require('react');
var TextField = require('material-ui/lib/text-field');
var VictimStore = require('../store/VictimStore');
var Paper = require('material-ui/lib/paper');
var RaisedButton = require('material-ui/lib/raised-button');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

function getStateFromStore() {
  var storeState = VictimStore.get();
  return {
    victim: storeState.get('selected'),
    command: ''
  };
}

var VictimCommandInput = React.createClass({
  mixins: [LinkedStateMixin],

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

  handleTap: function () {
    console.log('clicked');
  },

  handleChange: function (event) {
    this.setState({command: event.target.value});
  },

  render: function () {
    var boundTap = this.handleTap.bind(this, this.state.victim);
    return (
      <Paper zDepth={1} style={{marginTop: 10, paddingTop: 5, paddingBottom: 5, textAlign: 'center'}}>
      <TextField
        hintText="Type the command here"
        floatingLabelText="$ >"
        multiLine={true}
        value={this.state.command}
        onChange={this.handleChange}
        style={{width: '100%'}} />
      <br />
      <RaisedButton
        label="Send"
        primary={true}
        onMouseDown={boundTap}
        onTouchTap={boundTap}
        style={{marginLeft: 5}} />
      </Paper>
    )
  }
});

module.exports = VictimCommandInput;
