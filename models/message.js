var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  belongsTo: String,
  username: String,
  message: String
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
