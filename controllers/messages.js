var Message = require('../models/message');
var Groupchat = require('../models/groupchat');

module.exports = {
  index: index,
  create: create
}

function index(req, res, next) {
  Message.find({}, function(err, messages) {
    if (err) next (err);

    res.json(messages);
  });
}

function create(req, res, next) {
  var newMessage = new Message(req.body);
  newMessage.save(function(err, savedMessage) {
    if (err) next (err);

    res.json(savedMessage);
  });
}
