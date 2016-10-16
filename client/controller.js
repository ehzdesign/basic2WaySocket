//initialize socket io
var socket = new io();


//the input where user enters requested song
var $song = $('#song-request');

//the submit button to submit the users song choice
var $submitBtn = $('#submit');




//send the song to server after clicking the `$submitBtn`
$submitBtn.on('click', function(event) {
  event.preventDefault();
  /* Act on the event */

  socket.emit('song-requested', $song.val());
  console.log($song.val());

  //send user info
  // socket.emit('userInfo', $user);
  if($.isEmptyObject(user) === false){
    console.log(user);
  }

});
