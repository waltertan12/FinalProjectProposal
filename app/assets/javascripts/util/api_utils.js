(function (root) {
  if (typeof root.ApiUtils === "undefined") {
    root.ApiUtils = {};
  }

  root.ApiUtils = {
    fetchUser: function (userId, callback) {
      $.ajax({
        url: "/api/users/" + userId,
        type: "GET",
        dataType: "json",
        success: function (user) {
          callback(user);
        },
        error: function (err) {
          console.log(err.responseText);
        }
      })
    },
    updateUser: function (userId, params, callback) {
      $.ajax({
        url: "/api/users/" + userId,
        type: "PUT",
        dataType: "json",
        data: {user: params},
        success: function (user) {
          console.log(user);
          callback(user);
        },
        error: function (err) {
          console.log(err.responseText);
        }
      })
    },
    deleteUser: function (user) {
      $.ajax({
        url: "/api/users/" + user.id,
        type: "DELETE",
        dataType: "json",
        success: function (user) {

        },
        error: function (err) {
          console.log(err.responseText);
        }
      })
    },
    destroySession: function() {
      $.ajax({
        url: "/logout",
        type: "DELETE",
        success: function(response) {
          window.location.assign("/");
        },
        error: function (err) {
          console.log(err.responseText);
        }
      })
    },
    followUser: function (user, callback) {
      $.ajax({
        type: "POST",
        url: "/api/followings",
        data: {followed_id: user.id},
        success: function (currentUser) {
          callback(currentUser);
        },
        error: function (err) {
          console.log(err.responseText)
        }
      })
    },
    unfollowUser: function (user, callback) {
      $.ajax({
        type: "DELETE",
        url: "/api/followings",
        data: {followed_id: user.id},
        success: function (currentUser) {
          callback(currentUser);
        },
        error: function (err) {
          console.log(err.responseText)
        }
      })
    },
    fetchTrack: function (trackId, callback) {
      $.ajax({
        url: "api/tracks/" + trackId,
        type: "GET",
        dataType: "json",
        success: function (track) {
          callback(track);
        },
        error: function(err) {
          console.log(err.responseText);
        }
      })
    },
    uploadTrackToCloudinary: function (uploadData, callback) {
      var utils = this,
          metadata = uploadData.metadata,
          audio = uploadData.audio,
          image;
      if (typeof uploadData.image !== "undefined") {
        image = uploadData.image;
      }
      // Upload audio to cloudinary
      $.ajax({
        url: "https://api.cloudinary.com/" + 
              window.CLOUDINARY_VERSION + 
              "/" + 
              window.CLOUDINARY_NAME +
              "/video/upload",
        type: "POST",
        processData: false,
        contentType: false,
        data: audio,
        success: function (cloudinaryResponse) {
          console.log(cloudinaryResponse);
          metadata.track_url = cloudinaryResponse.url;
          utils.uploadTrack(metadata, callback);
        },
        error: function (cloudinaryResponse) {
          console.log(cloudinaryResponse.responseText);
        }
      })
    },
    uploadTrack: function (audioData, callback) {
      $.ajax({
        url: "/api/tracks",
        type: "POST",
        data: {track: audioData},
        success: function (track) {
          callback(track);
        },
        error: function (err) {
          console.log(err.responseText);
        }
      })
    }
  };
})(this);