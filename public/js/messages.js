$(function() {
	// Grab all the needed DOM elements using jQuery
	$m = $('#m');
	$form = $('#form');
	$messages = $('#messages');

	var socket = io();

	// Grab all messages from our db
  $.ajax({
    type: "GET",
    url: "/api/messages"
  }).then(
    function(jsonMessages) {
      // Iterate through our array of json messages
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

		// Use AJAX to add the new message to our db
		$.ajax({
			method: "POST",
			url: "/api/messages",
			data: message
		}).then(
			function(jsonMessage) {
				console.log("Success: ", jsonMessage);

				// Clear the form
				$m.val("");

				return jsonMessage;
			},
			function(err) {
				console.log("Failed: ", err);
			}
		)
	});

	$form.submit(function() {
		socket.emit('send to server', (`${$('.spanTag').attr('id')}: ${$m.val()}`));
		$m.val('');
		return false;
	});
	socket.on('send to client', function(msg) {
		console.log(msg);
		$messages.append($('<li>').text(msg));
	});

// end of document.ready function
});
