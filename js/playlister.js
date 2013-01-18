(function() {

  K.playlister = {
    rdioPlaylists: [],
    newListKeys: [],

    getUserPlaylists: function() {
      R.ready(function() {
          R.request({
            method:"getUserPlaylists",
            content:{
              user: R.currentUser.get("key"),
              count: 100,
              extras: '-*,name,key,trackKeys'
            },
            success: function(data) {
              _.each(data.result, function(v, i) {
                K.playlister.rdioPlaylists.push(v);
                K.playlister.makePlaylistMenuButton(v);
              });
            }
          });
      });
    },

    makePlaylistMenuButton: function(playlist) {
      var $pl = $('<div />', {
        'class': 'playlistbutton',
        'id': playlist.key,
        html: playlist.name
        }).bind('click', function() {
          K.toggleChosen(this);
        }).appendTo('.userplaylists');

      $('.confirmbox').show();
    },

    makeNewPlaylist: function() {
      var plName = $('#plname input').attr('value');
      var plDesc = $('#pldesc textarea').attr('value');
      $('#newlist').html(plName);

      R.request({
        method: 'createPlaylist',
        content: {
          name: plName,
          description: plDesc,
          tracks: K.playlister.newListKeys.join()
        },
        success: function() {
          $('.playlistbutton').not('#newlist').remove();
          $('#sucessscreen').show()
          K.playlister.getUserPlaylists();
          $('.combinedetails').hide();
        }
      });
    }
  };

})();
