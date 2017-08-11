(function() {
    function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         /**
         * @desc returns album Object from Fixtures
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

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

            currentBuzzObject.bind('timeupdate', function() {
               $rootScope.$apply(function() {
                   SongPlayer.currentTime = currentBuzzObject.getTime();
               });
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
         * @function stopSong
         * @desc Stops the currentBuzzObject audio file
         * @param {Object} song
         */
         var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
         };

         /**
         * @function getSongIndex
         * @desc Return index of the active song
         * @param {Object} song
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         }

         /**
         * @desc Active object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {number}
         */
         SongPlayer.currentTime = null;

         /**
         * @desc Current volume of currently playing song
         * @type {number}
         */
         SongPlayer.volume = null;

         /**
         * @function SongPlayer.play
         * @desc if currently playing song is not song clicked it will pause that song and play clicked song and if the currently playing song is paused it will play it again
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
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
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
          };

          /**
          * @function SongPlayer.previous
          * @desc Plays the previously indexed song
          * @param {Object}
          */
          SongPlayer.previous = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex--;

              if (currentSongIndex < 0) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          /**
          * @function SongPlayer.next
          * @desc Plays the next indexed song
          * @param {Object}
          */
          SongPlayer.next = function() {
              var currentSongIndex = getSongIndex(SongPlayer.currentSong);
              currentSongIndex++;

              if (currentSongIndex > currentAlbum.songs.length -1) {
                  stopSong(SongPlayer.currentSong);
              } else {
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
              }
          };

          /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
          SongPlayer.setCurrentTime = function(time) {
              if (currentBuzzObject) {
                  currentBuzzObject.setTime(time);
              }
          };

          /**
          * @function setCurrentVolume
          * @desc Set current volume of currently playing song
          * @param {Number} volume
          */
          SongPlayer.setCurrentVolume = function(volume) {
              if (currentBuzzObject) {
                  currentBuzzObject.setVolume(volume);
              }
          };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
