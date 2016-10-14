//this is for main player
var socket = new io();


//large bg image when song is playing
var $bgAlbumCover = $('.bg-album-cover');


//display the name of song in `.chosenSong`
var $chosenSong = $('#chosenSong');

// create new audio
var audio = new Audio();

//show image of album cover
var $albumCover = $('#album-cover');

socket.on('song-requested', function(msg){

  $chosenSong.text(msg + ' is currently playing');

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

      //  $albumCover.attr('src', track.album.images[1].url)
      //             .addClass('playing');
       $albumCover.css('background-image', 'url(' + track.album.images[1].url + ')');
       console.log(track);

       //get large image and display in bg of app
       $bgAlbumCover.css('background-image', 'url('+ getLargeAlbumCover(track) +')');

    }
  })


};


//return large image from track object
function getLargeAlbumCover(song) {
  var largeImage640 = song.album.images[0].url;
  return largeImage640;
}
