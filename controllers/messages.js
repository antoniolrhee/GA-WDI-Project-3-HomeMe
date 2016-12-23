var Message = require('../models/message');
var Groupchat = require('../models/groupchat');

module.exports = {
  index: index,
  create: create,
  show: show
}

function index(req, res, next) {
  Message.find({}, function(err, messages) {
    if (err) next (err);

    res.json(messages);
  });
}

function show(req, res, next) {
  Message.findById(id, function(err, message) {
    if (err) throw err;

    res.json(message);
  });
}

function create(req, res, next) {
  var newMessage = new Message(req.body);
  console.log(req.params)
  // newMessage.chat =
  newMessage.save(function(err, savedMessage) {
    if (err) next (err);

    res.json(savedMessage);
  });
}
