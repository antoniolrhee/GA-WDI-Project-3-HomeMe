var io = require('socket.io')();

// code below runs when a user enters a chatroom
io.on('connection', function(socket) {
	socket.on('data', function(msg) {
		// parse json and send back appropriate info
		// emits to a chat named whatever the id of the chatroom is
		var res = `${msg.username}: ${msg.message}`;
		io.emit(`${msg.chatId}`, res);
	});
});

module.exports = io;
