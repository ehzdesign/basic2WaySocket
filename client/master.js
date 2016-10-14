$(document).ready(function() {
  setTimeout(getToken, 1000);
});


//get token from open triva db
$.ajax({
  url: 'http://opentdb.com/api_token.php?command=request'
})
.done(function(data) {
  var token = data.token;
  var responseMessage = data.response_message;

  console.log("success");
  console.log('this is the token: ' + token);
  console.log('this is the responseMessage: ' + responseMessage);
})
.fail(function() {
  console.log("error");
})
.always(function() {
  console.log("complete");
});
