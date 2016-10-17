//this is for main player
var socket = new io();


//large bg image when song is playing
var $bgAlbumCover = $('.bg-album-cover');

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

var trackFound;

//create new audio object
var audio = new Audio();

//keep track of current track
var currentTrack = 0;

var isPlaying;



//get the request sent by user
socket.on('song-requested', function(msg){


  //get the song that was typed by the user
  var song = msg.songTyped;
  console.log(song);

  // search the song with spotify api and add to the request
  spotifySearch(song, msg);

    console.log(playlist);


    // playSong();






});


// socket.on('userInfo', function(msg){
//   //do cool things with user information
//   console.log(msg);
//
//   //store html template for a user request
//   var request = createUserRequest(msg);
//
//   //add to the user request array
//   playlist.push(request);
//
//   // get the most recently added request to user Requests
//   var recentRequest = $(playlist).get(-1);
//
//
//   //display the user that made mos recent song request
//   $userRequestSection.append(recentRequest.image);
//
//
//
// });





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


      if(playlist.length > 0 && isPlaying === undefined){
        // console.log(playlist[currentTrack].track.audio);
        // console.log(isPlaying);
        // audio.src = playlist[currentTrack].track.audio;
        // audio.play();
        playSong();
        isPlaying = true;
        console.log(isPlaying);

      }

      // console.log(trackPreview);

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
      // $currentAlbumCover.css('background-image', 'url(' + track.album.images[1].url + ')');
      // console.log(track);
      //
      // //get large image and display in bg of app
      // $bgAlbumCover.css('background-image', 'url('+ getLargeAlbumCover(track) +')');
      //
      // //display the title of the song
      // $currentSongTitle.text(getTrackTitle(track));



    }
  })



};


function getTrackInfo(response){
  //gonna store all  the track info
  var track = {};

  // first track brought back by spotify
  var firstTrackFound = response.tracks.items[0];

  // console.log(firstTrackFound);

  //add the preview track mp3 to track object
  track.audio = firstTrackFound.preview_url;

  //add the album image to track object
  track.albumImage = firstTrackFound.album.images[1].url;

  //add the track name to track object
  track.title = firstTrackFound.name;

  //get artists names and store as array
  var trackArtists = [];
  // console.log(firstTrackFound);

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
  //check if playlist is empty
  if(playlist.length > 0 && currentTrack != playlist.length){
    audio.src = playlist[currentTrack].track.audio;
    audio.play();

  }else{
    console.log('no more songs to play');
  }

};

$(audio).on('ended', function(event) {
  event.preventDefault();
  /* Act on the event */
  console.log('song has ended');
  currentTrack++;
  playSong();
});
