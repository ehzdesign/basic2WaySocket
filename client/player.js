//this is for main player
var socket = new io();


//large bg image when song is playing
var $bgAlbumCover = $('.bg-album-cover');

//user request div
var $userRequestSection = $('#user-requests');

//collection of all users and their requests
var userRequests = [];

// create new audio
var audio = new Audio();
// var audio = $('#audio');

//show image of album cover
var $currentAlbumCover = $('#current-song .album-cover');

//display the name of current song being played
var $currentSongTitle = $('#current-song .song-title');

socket.on('song-requested', function(msg){

  // $chosenSong.text(msg + ' is currently playing');

  //song to add to player
  var song = msg;

  spotifySearch(msg);

});


socket.on('userInfo', function(msg){
  //do cool things with user information
  console.log(msg);

  //store html template for a user request
  var request = createUserRequest(msg);

  //add to the user request array
  userRequests.push(request);

  // get the most recently added request to user Requests
  var recentRequest = $(userRequests).get(-1);


  //display the user that made mos recent song request
  $userRequestSection.append(recentRequest.image);



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
      console.log(track);
      audio.src = track.preview_url;
      var trackPreview = track.preview_url;
      // audio.attr('src', trackPreview);
      audio.play();
      //
      //

      console.log(trackPreview);

      // var sound = new Howl({
      //   src: [trackPreview],
      //   autoplay: true,
      //   html:true,
      //   mobileAutoEnable: true
      // });
      //
      //
      //
      // sound.play();

      //  $currentAlbumCover.attr('src', track.album.images[1].url)
      //             .addClass('playing');
      $currentAlbumCover.css('background-image', 'url(' + track.album.images[1].url + ')');
      console.log(track);

      //get large image and display in bg of app
      $bgAlbumCover.css('background-image', 'url('+ getLargeAlbumCover(track) +')');

      //display the title of the song
      $currentSongTitle.text(getTrackTitle(track));



    }
  })


};


//return large image from track object
function getLargeAlbumCover(song) {
  var largeImage640 = song.album.images[0].url;
  return largeImage640;
}

//return album title
function getTrackTitle(song) {
  var trackTitle = song.name;
  return trackTitle;
}

function createUserRequest(userInfo) {
  var request = {};
  request.image = $('<div></div', {'class': 'request__profile-image'});
  request.image.css('background-image','url(' + userInfo.image + ')');
  return request;
}
