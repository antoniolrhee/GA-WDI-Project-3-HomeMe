$(document).ready(function() {
  // Grab all groupchats from our db
  $.ajax({
    type: "GET",
    url: "/api/groupchats"
  }).then(
    function(jsonGroupchats) {
      // Iterate through our array of json groupchats
      jsonGroupchats.forEach(function(jsonGroupchat) {
        $(chatroomList).prepend(
          // $(`<li id=${jsonGroupchat._id}>${jsonGroupchat.chatName} - <a href="groupchats/${jsonGroupchat._id}">Enter Chatroom</a> <button onclick="deleteChatroom(this)" type="button" class="button special">X</button> </li>`)

          $(`<div id=${jsonGroupchat._id} class="3u 12u$(xsmall)">
              ${jsonGroupchat.chatName}
              <input type="text" name="demo-name" class="passwordAttempt" value="" placeholder="Enter Password" /><br>
              <a id="groupchats/${jsonGroupchat._id}">
                <button onclick="checkPassword(this)" type="button" class="button special">Enter</button>
              </a>
            </div>`)
        );
      });
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
      $('#requiredFields').modal('show');
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
          $(chatroomList).prepend(
            // $(`<li>${jsonGroupchat.chatName} - <a href="groupchats/${jsonGroupchat._id}">Enter Chatroom</a> <button onclick="deleteChatroom(this)" type="button" class="button special">X</button></li>`)

            $(`<div id=${jsonGroupchat._id} class="3u 12u$(xsmall)">
                ${jsonGroupchat.chatName}
                <input type="text" name="demo-name" class="passwordAttempt" value="" placeholder="Enter Password" /><br>
                <a id="groupchats/${jsonGroupchat._id}">
                  <button onclick="checkPassword(this)" type="button" class="button special">Enter</button>
                </a>
              </div>`)
          );
        }
      );
    }
  });
});

function checkPassword() {
  $.ajax({
    type: "GET",
    url: "/api/groupchats"
  }).then(
    function(jsonGroupchats) {
      // Iterate through our array of json groupchats
      jsonGroupchats.forEach(function(jsonGroupchat) {
        if($('.passwordAttempt').val() == jsonGroupchat.chatPassword) {
          location.href = `groupchats/${jsonGroupchat._id}`
        }
      });
    }
  );
}
