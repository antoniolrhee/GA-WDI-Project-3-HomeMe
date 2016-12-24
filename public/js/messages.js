$(function() {
	// Grab all the needed DOM elements using jQuery
	$m = $('#m');
	$form = $('#form');
	$messages = $('#messages');

	// brings in code from the server side (io.js)
	var socket = io();

	// Grab all messages from our db
  $.ajax({
    type: "GET",
    url: "/api/messages"
  }).then(
    function(jsonMessages) {
      // Iterate through array of json messages
			// If a jsonMessage belongsTo attr matches the url substring, messages will be appended to the chatbox
			jsonMessages.forEach(function(jsonMessage) {
				if(jsonMessage.belongsTo == window.location.pathname.slice(12)) {
					// Create an html element for the single message
					$messages.append($('<li>').text(`${jsonMessage.username}: ${jsonMessage.message}`));
				}
			});
    }
  );

		// Attach listener on form button to perform AJAX post of new message.
	$form.on('submit', function(evt) {
		// Stop the default behavior from clicking on the submit button.
		evt.preventDefault();
		var message = {
			belongsTo: window.location.pathname.slice(12),
			username: $('.spanTag').attr('id'),
			message: $m.val()
		}

		// Use AJAX to add the new message to /api/messages
		// data: message is defined above in $form submit
		$.ajax({
			method: "POST",
			url: "/api/messages",
			data: message
		}).then(
			function(jsonMessage) {
				console.log("Success: ", jsonMessage);

				// Clear the form
				$m.val('');

				return jsonMessage;
			},
			function(err) {
				console.log("Failed: ", err);
			}
		)
	});

	$form.submit(function() {
		// send a json object to server side
		var data = {
			username: $('.spanTag').attr('id'),
			message: $m.val(),
			chatId: window.location.pathname.slice(12)
		}
		// socket.emit sends data to the server side (io.js)
		socket.emit('data', data);
		$m.val('');
		return false;
	});
	// receives an emit from the server side, url pathname must match the emit source, in this case the chatroom's id
	socket.on(`${window.location.pathname.slice(12)}`, function(res) {
		console.log(res);
		$messages.append($('<li>').text(res));
	});

// end of document.ready function
});
