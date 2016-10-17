// when song is found thorugh spotify search add to playlist
var playlist = [];

//current playing index
var currentlyPlayingSong;

//tell app that song is playing
var isPlaying = false;

// create the audio
var audio = new Audio();


//search for the song from user request
function songSearch ( request ) {

  //search for the song with spotify

  if ( song ){
    pushToPlaylist(song);
  }


}

// push to playlist
pushToPlaylist(song){
  playlist.push(song);
}


//append all to dom
displayRequestToDom (playlist) {
  for (var i = 0; i < playlist.length; i++) {
    // create div with data and append to playlistHTML
    div.image = playlist[i].image;
    div.trackName = playlist[i].trackName;
    div.userName = playlist[i].userName;
  }
}

removeFromPlaylist () {
//remove from playlist and from dom
}


playSong () {
// start the audio
audio.src = currentPlayingSong.track.audio;
audio.play();

}

audio.end();

playNextSong () {
  // play next song when the previous is finsihed
}

checkIfSongsExist () {
  //check if there are songs in the playlist
}
