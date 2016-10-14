$(document).ready(function() {
  setTimeout(getToken, 1000);
});


//get token from open triva db
//
function getToken(){

  $.ajax({
    url: 'http://opentdb.com/api_token.php?command=request?handleData',
    type: 'GET'
  })

};


function handleData (data) {
  // body...
  var token = data.token;
  var responseMessage = data.response_message;

  console.log("success");
  console.log('this is the token: ' + token);
  console.log('this is the responseMessage: ' + responseMessage);

}
