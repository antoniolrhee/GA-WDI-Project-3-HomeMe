(() => {
  document.getElementById("file-input").onchange = () => {
    var files = document.getElementById('file-input').files;
    var file = files[0];
    if (file == null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
})();
function getSignedRequest(file){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}
function uploadFile(file, signedRequest, url){
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    console.log('hi')
    if (xhr.readyState === 4){
      if (xhr.status === 200){
        document.getElementById('preview').src = url;
        document.getElementById('imageurl').value = url;
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

console.log('asdfasdf ->', listingId);

$('#submitListing').click(function(event) {

  console.log('jQuery works')
	var city = $('#city').val();
	var state = $('#state').val();
  var address = $('#address').val();
  var zipcode = $('#zipcode').val();
  var price = $('#price').val();
  var bedrooms = $('#bedrooms').val();
  var bathrooms = $('#bathrooms').val();
  var duration = $('#duration').val();
  var pets = $('#pets').val();
  var furnished = $('#furnished').val();
  var imageurl = $('#imageurl').val();

	var params = {
		"city": city,
		"state": state,
		"address": address,
		"zipcode": zipcode,
		"price": price,
		"bedrooms": bedrooms,
		"bathrooms": bathrooms,
		"duration": duration,
		"pets": pets,
		"furnished": furnished,
    "imageurl": imageurl
	 }

   var putData = {
     'id': listingId,
   }


   for (var key in params) {
     if (params[key] !== "") putData[key] = params[key];
   }

	 console.log(params);
   console.log(putData);

  // $.post( "http://localhost:3000/api/listings", params, "json").done(function(){
  //   window.location.href="/listings"
  // });

  $.ajax({
    type: "PUT",
    url: "/api/listings",
    data: putData
  }).done(function(){
    window.location.href="/listings/postedlistings"
  });

  event.preventDefault();
});
