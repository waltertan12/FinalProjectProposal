(function (root) {
  if (typeof root.TrackActions === "undefined") {
    root.TrackActions = {};
  }

  root.TrackActions = {
    playOrPauseTrack: function (action, track, optionalTracks) {
      if (action) {
        AppDispatcher.dispatch({
          actionType: TrackConstants.PLAY_TRACK,
          track: track,
          tracks: optionalTracks
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TrackConstants.PAUSE_TRACK,
          track: track,
          tracks: optionalTracks
        })
      }
    },
    playerPlayOrPause: function (action) {
      if (action) {
        AppDispatcher.dispatch({
          actionType: TrackConstants.PLAY_CURRENT_TRACK
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TrackConstants.PAUSE_CURRENT_TRACK
        })
      }
    },
    nextTrack: function () {
      AppDispatcher.dispatch({
        actionType: TrackConstants.NEXT_TRACK
      })
    },
    previousTrack: function () {
      AppDispatcher.dispatch({
        actionType: TrackConstants.PREVIOUS_TRACK
      })
    },
    changeVolume: function (volume) {
      AppDispatcher.dispatch({
        actionType: TrackConstants.VOLUME_CHANGED,
        volume: volume
      })
    },
    resetPlaylist: function (tracks) {
      AppDispatcher.dispatch({
        actionType: TrackConstants.RESET_PLAYLIST,
        tracks: tracks
      })
    },
    receiveTracks: function (userId) {
      var dispatchCallback = function (userId, tracks) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACKS_RECEIVED,
          userId: userId,
          tracks: tracks
        });
      };

      ApiUtils.fetchTracks(userId, dispatchCallback);
    },
    receiveSingleTrack: function (trackId) {
      var dispatchCallback = function (userId, track) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACK_RECEIVED,
          userId: userId,
          track: track
        });
      };

      ApiUtils.fetchTrack(trackId, dispatchCallback);
    },
    uploadTrack: function (uploadData) {
      var dispatchCallback = function (track) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACK_CREATED,
          userId: track.user_id,
          track: track
        });
      };

      var progressCallback = function (progress, userId, trackId) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACK_PROGRESS,
          userId: userId,
          trackId: trackId,
          progress: progress
        })
      };
      
      ApiUtils.uploadTrackToCloudinary(
        uploadData, 
        dispatchCallback, 
        progressCallback
      );
    },
    destroyTrack: function (trackData, redirect) {
      var dispatchCallback = function (track) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACK_DELETED,
          userId: track.user_id,
          track: track
        });
      };

      ApiUtils.destroyTrack(trackData, dispatchCallback, redirect);
    },
    updateTrack: function (trackData, redirect) {
      var dispatchCallback = function (track) {
        root.AppDispatcher.dispatch({
          actionType: root.TrackConstants.TRACK_UPDATED,
          userId: track.user_id,
          trackId: track.id
        });
      };

      ApiUtils.updateTrack(trackData, dispatchCallback, redirect);
    }
  };
})(this);