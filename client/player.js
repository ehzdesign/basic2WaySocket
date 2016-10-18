//this is for main player
var socket = new io();


//large bg image when song is playing
var $bgAlbumCover = $('.bg-album-cover');

//next song background album cover
var $bgAlbumCoverNext = $('.bg-album-cover--next');

//user request div
var $playlistHTML = $('#playlist');

//collection of all users and their requests
var playlist = [];

// create new audio
var audio = new Audio();
// var audio = $('#audio');

//show image of album cover
var $currentAlbumCover = $('#current-song .album-cover');

//display the name of current song being played
var $currentSongTitle = $('#current-song .song-title');

//display the artist name of the currently playing song
var $currentSongArtist = $('.song-artist');

var trackFound;

//create new audio object
var audio = new Audio();

//keep track of current track
var currentTrackIndex = 0;

var isPlaying;



//get the request sent by user
socket.on('song-requested', function(msg){


  //get the song that was typed by the user
  var song = msg.songTyped;
  console.log(song);

  // search the song with spotify api and add to the request
  spotifySearch(song, msg);

    console.log(playlist);


});








function spotifySearch(query, msg) {
  //create ajax call
  console.log(query);
  $.ajax({
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'track'
    },
    success: function(response){


      var request = msg;
      //get the track information for the song searched by user
      trackFound = getTrackInfo(response);

      //store track information in the request object
      request.track = trackFound;

      //push the request to the playlist
       playlist.push(request);

      console.log(playlist);
      console.log(request);

      $playlistHTML.append(drawRequest(request));

      console.log(isPlaying);
      // console.log(playlist.length);
      if(playlist.length == 1 && isPlaying === undefined ){
        // console.log(playlist[currentTrack].track.audio);
        // console.log(isPlaying);
        // audio.src = playlist[currentTrack].track.audio;
        // audio.play();

        playSong();
        currentTrackInfo();
        // nextTrackBg();
        isPlaying = true;
        // console.log(isPlaying);

      }

      if(playlist[1]){
        nextTrackInfo();
      }

    }
  })



};


function getTrackInfo(response){
  //gonna store all  the track info
  var track = {};

  // first track brought back by spotify
  var firstTrackFound = response.tracks.items[0];



  //add the preview track mp3 to track object
  track.audio = firstTrackFound.preview_url;

  //add the album image to track object
  track.albumImage = firstTrackFound.album.images[1].url;

  //add the track name to track object
  track.title = firstTrackFound.name;

  //get artists names and store as array
  var trackArtists = [];


  // for all the artists push name to `artistsArray`
  for (var artist in firstTrackFound.artists) {

    trackArtists.push(firstTrackFound.artists[artist].name);
  }

  //store in requested song object as an array of contributing artists
  track.artistsArray = trackArtists;

  // store in requested song object as a comma seperated string
  track.artistsString = track.artistsArray.join(', ');


  return track;
}


//create html element with all requested song information incl- user info and track info booyah!!!!
function drawRequest(obj){
  var request = $('<div></div>', {'class' : 'request'});
  request.css('background-image', 'url(' + obj.image + ')');
  request.attr('data-track-title', obj.track.title);
  request.attr('data-username', obj.name);
  return request;
};

function playSong() {

  let currentTrack = playlist[0];
    audio.src = currentTrack.track.audio;
    audio.play();
    console.log('first song is playing');
    isPlaying = true;
    nextTrackInfo();


};

$(audio).on('ended', function(event) {
  event.preventDefault();
  /* Act on the event */
  console.log('song has ended');
  console.log('contents of playlist: ' + playlist);
  removeRequest();
  if(playlist.length == 0) {
    isPlaying = undefined;
  }else{
    isPlaying = false;
    playSong();
    currentTrackInfo();
  }
});

//show the currently playing track album info
function currentTrackInfo () {

    var currentTrack = playlist[0];
    console.log(currentTrack);
    console.log('display current track info');

    $currentAlbumCover.css('background-image','url( ' + currentTrack.track.albumImage + ')');
    $currentSongTitle.text(currentTrack.track.title);
    $currentSongArtist.text(currentTrack.track.artistsString);
    $bgAlbumCover.css('background-image', 'url('+ currentTrack.track.albumImage +')');
    console.log('add the border');
    $playlistHTML.find('.request:eq(0)').addClass('current-request');



}

//remove the request from playlist
function removeRequest () {

  $playlistHTML.find('.request:eq(0)').fadeOut('slow', function() {
    $(this).remove();
    $playlistHTML.find('.request:eq(0)').addClass('current-request');
  });
  playlist.shift();
  console.log(playlist);
}

function nextTrackInfo () {
  if(playlist[1]){
    let nextTrack = playlist[1];
    $bgAlbumCoverNext.css('background-image', 'url('+ nextTrack.track.albumImage +')');
  }
  if(playlist.length == 1){
    $bgAlbumCoverNext.css('background-image', 'none');
  }
}
