var Message = require('../models/message');

module.exports = {
  index: index,
  create: create,
}

function index(req, res, next) {
  Message.find({}, function(err, messages) {
    if (err) next (err);

    res.json(messages);
  });
}

function create(req, res, next) {
  console.log(req.query);
  console.log(req.params.id);
  console.log(req.body);
  console.log(req.user);
  console.log(req.body.username);
  console.log(req.body.message);
  // var newMessage = new Message(req.body);
  var newMessage = {
    chat: req.params.id,
    username: req.body.username,
    message: req.body.message
  }
  newMessage.save(function(err, savedMessage) {
    if (err) next (err);

    res.json(savedMessage);
  });
}
