var mongoose = require('mongoose');

var groupchatSchema = new mongoose.Schema({
  chatName: String,
  chatPassword: String,
});

var Groupchat = mongoose.model('Groupchat', groupchatSchema);
module.exports = Groupchat;
