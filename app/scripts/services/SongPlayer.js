(function() {
    function SongPlayer() {


         var SongPlayer = {};

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */

         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc Plays the currentBuzzObject audio file
         * @param {Object} song
         */

         var playSong = function(song) {
            currentBuzzObject.play()
            song.playing = true;
         };

         /**
         * @desc Song object from list of songs
         * @type {Object}
         */

         SongPlayer.currentSong = null;

         /**
         * @function SongPlayer.play
         * @desc if currently playing song is not song clicked it will pause that song and play clicked song and if the currently playing song is paused it will play it again
         * @param {Object} song
         */

         SongPlayer.play = function(song) {
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);

              } else if (SongPlayer.currentSong === song) {
                  if (currentBuzzObject.isPaused()) {
                      currentBuzzObject.play();
                  }
              }
          };

          /**
          * @function SongPlayer.pause
          * @desc pauses the currently playing song
          * @param {Object} song
          */
          SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
          };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
