 (function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         
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
 
            SongPlayer.currentSong = song;
         };
         
              
         /**
         * @function playSong
         * @desc Plays currently the audio file as currentBuzzObject and sets the .playing attribute to true
         * @param {Object} song
         */
         
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         
         /**
         * @function stopSong
         * @desc Stops the current audio file and sets the currently playing song to null.
         * @param {Object} song
         */
         
         var stopSong = function(song) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }
         
         /**
         * @function getSongIndex
         * @desc Grabs the index of song from the currentAlbum.songs array 
         * @param {Object} song
         */
         
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @desc Current song object
         * @type {Object}
         */

         SongPlayer.currentSong = null;
         

         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);

          } else if (SongPlayer.currentSong === song) {
              if (currentBuzzObject.isPaused()) {
                playSong(song);
              }
            }
         };         

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
         /**
         * @function SongPlayer.previous
         * @desc Using the getSongIndex function, subtracts 1 from the index, moving backwards in the currentAlbum.songs array. 
         * If the index goes below 0, it stops the song and sets the currentSong to null. Otherwise is plays the new song based
         * on the song index.
         * @returns The previous song.
         */
         
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
            } 
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
         /**
         * @function SongPlayer.next
         * @desc Using the getSongIndex function, add 1 to the index, moving forwards in the currentAlbum.songs array. 
         * If the index is greater than or equal to the amount of songs, it stops the song and sets the currentSong to null. Otherwise is * plays the new song based on the song index.
         * @returns The next song.
         */ 
        
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            var length = currentAlbum.songs.length;
            
            currentSongIndex++;
            
            if (currentSongIndex >= length ) {
                stopSong(SongPlayer.currentSong);
            }
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song)
            }      
        }
         
        return SongPlayer;
        }
 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();