$(document).ready(function() {
  // Grab all groupchats from our db
  $.ajax({
    type: "GET",
    url: "/api/groupchats"
  }).then(
    function(jsonGroupchats) {
      // Iterate through our array of json groupchats
      for(var i = 0; i < jsonGroupchats.length; i++) {
        $(chatroomList).prepend(

          $(`<div id=${jsonGroupchats[i]._id} class="3u 12u$(xsmall)">
          ${jsonGroupchats[i].chatName}
          <input type="text" name="demo-name" id="passwordAttempt${[i]}" value="" placeholder="Enter Password" /><br>
          <a id="/api/groupchats/${jsonGroupchats[i]._id}">
          <button type="button" class="button special">Enter</button>
          </a>
          </div>`)
        );
      }
    }
  );

  // Attach listener on form button to perform AJAX post of new groupchat.
  $('#createChat').click(function(evt) {
    // Stop the default behavior from clicking on the submit button.
    evt.preventDefault();
    var newGroupchat = {
      chatName: $('#chatroomName').val().replace(/\s/g, ''),
      chatPassword: $('#chatroomPassword').val().replace(/\s/g, '')
    }
    if($('#chatroomName').val().replace(/\s/g, '') == "" || $('#chatroomPassword').val().replace(/\s/g, '') == "") {
      alert('Missing required fields');
    } else {
      // Use AJAX to add the new groupchat to our db
      $.ajax({
        method: "POST",
        url: "/api/groupchats",
        data: newGroupchat
      }).then(
        function(jsonGroupchat) {
          console.log(jsonGroupchat);
          // Clear the form
          $('#chatroomName').val("");

          return jsonGroupchat;
        },
        function(err) {
          console.log("Failed: ", err);
        }
      ).then(
        function(jsonGroupchat) {
          location.reload();
        }
      );
    }
  });
});

function checkPassword() {
  console.log(this);
  console.log($(this).parent().prev().prev().val());
  $.ajax({
    type: "POST",
    url: $(this).parent().attr('id'),
    data: {
      password: $(this).parent().prev().prev().val()
    }
  }).then(
    function(data) {
      // Iterate through our array of json groupchats
      if(data.correctRoom) {
        location.href = data.correctRoom;
      } else {
        location.reload();
      }
    }
  );
}

$('#chatroomList').on('click', 'button', checkPassword);
