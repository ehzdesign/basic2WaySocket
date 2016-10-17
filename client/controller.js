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

  //check if user name and image has been set
  if($.isEmptyObject(user) === false){

    //store the exact value the user searched for
    user.songTyped = $song.val();

    //send user info to server
    socket.emit('song-requested', user);
  }


});
