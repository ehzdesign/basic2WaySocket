//this is for main player
var socket = new io();


//display the name of song in `.chosenSong`
var $chosenSong = $('#chosenSong');

// create new audio
var audio = new Audio();

//show image of album cover
var $albumCover = $('#currently-playing');

socket.on('song-requested', function(msg){

  $chosenSong.text(msg + 'is currently playing');

  //song to add to player
  var song = msg;

  spotifySearch(msg);

});


function spotifySearch(query) {
  //create ajax call
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'track'
    },
    success: function(response){
      var track = response.tracks.items[0];
      audio.src = track.preview_url;
      audio.play();

       $albumCover.attr('src', track.album.images[1].url);
    }
  })


};
