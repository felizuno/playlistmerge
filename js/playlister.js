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
			plName = $('#plname input').attr('value');
			plDesc = $('#pldesc textarea').attr('value');

			R.request({
				method: 'createPlaylist',
				content: {
					name: plName,
					description: plDesc,
					tracks: K.playlister.newListKeys.join()
				},
				success: function() {
			        $('.playlistbutton').remove();
			        K.playlister.getUserPlaylists();
			        $('.combinedetails').hide();

				}
			});
		}
	};

})();
