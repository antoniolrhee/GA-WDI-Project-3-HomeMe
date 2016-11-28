$(function() {
	// Grab all the needed DOM elements using jQuery
	$m = $('#m');
	$form = $('#form');
	$messages = $('#messages');

	var socket = io();

	// Grab all messages from our db
  $.ajax({
    type: "GET",
    url: "/api/groupchats/:id/messages"
  }).then(
    function(jsonMessages) {
      // Iterate through our array of json messages
			jsonMessages.forEach(function(jsonMessage) {
					// Create an html element for the single message
					$messages.append($('<li>').text(`${jsonMessage.username}: ${jsonMessage.message}`));
			});
    }
  );

		// Attach listener on form button to perform AJAX post of new message.
	$form.on('submit', function(evt) {
		// Stop the default behavior from clicking on the submit button.
		evt.preventDefault();
		var message = {
			username: $('.spanTag').attr('id'),
			message: $m.val()
		}

		// Use AJAX to add the new message to our db
		$.ajax({
			method: "POST",
			url: "/api/groupchats/:id/messages",
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

	$form.submit(function(){
		socket.emit('chat message', (`${$('.spanTag').attr('id')}: ${$m.val()}`));
		$m.val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$messages.append($('<li>').text(msg));
	});

// end of document.ready function
});
