(function() {

  window.K = {
    init: function() {
      R.ready(K._initUserButton);

      $('#reset').bind('click', function() {
        $('.confirmdisplay .playlistbutton').removeClass('chosen').appendTo('.userplaylists');
        $('#proceed').hide();
      });

      $('#proceed').bind('click', function() {
        K.getChosen();
        $('.combinedetails').show();
      });

      $('#cancel').bind('click', function(x) {
        x.preventDefault();
        $('.combinedetails').hide();
        $('#pldesc textarea').attr('value', '');
        K.playlister.newListKeys = [];
      });

      $('#merge').bind('click', function(x) {
        x.preventDefault();
        K.playlister.makeNewPlaylist();
      })

      $('.aboutbutton').bind('click', function() {
        $('#about').show();
      });

      $('#about').bind('click', function() {
        $(this).hide();
      });

      $('#sucessscreen').bind('click', function() {
        $(this).hide();
      });
    },

    _initUserButton: function() {
      if (R.authenticated()) {
        K.playlister.getUserPlaylists();
        $('.greeting').remove();
        var displayName = R.currentUser.get('vanityName');
        $('#rdiobutton')
          .attr('value', 'Logged in as: ' + displayName + ', click to open account')
          .bind('click', function() {
            window.open("http://www.rdio.com/people/"+ displayName);
        }); 
      } else {
        $('#rdiobutton')
          .attr('value', 'Click Here To Authorize/Log In With Rdio')
          .bind('click', function() {
            R.authenticate(K._initUserButton);
        });
      }
    },

    toggleChosen: function(button) {
      var $button = $(button);

      if ($button.hasClass('chosen')) {
        $button.appendTo('.userplaylists');
      } else {
        $button.appendTo('.confirmdisplay');
      }

      $button.toggleClass('chosen');
            
      var num = $('.chosen').length;
      if (num >= 2) {
        $('#proceed').show();
      } else {
        $('#proceed').hide();
      }
    },

    getChosen: function() {
      var $choices = $('.chosen');
      var pln = 'Combo of: ';
      var pld = 'Combination of: ';

      $.each($choices, function(i, v) {
        pln += $(v).text() + ', ';
        pld += $(v).text() + ' + ';
        _.each(K.playlister.rdioPlaylists, function(v2, i2) {
            if (v2.name == v.innerHTML) {
              K.addChosen(v2.trackKeys);
            }
        });
      });
      pln = pln.slice(0, pln.length - 2);
      pld = pld.slice(0, pld.length - 3);
      $('#plname input').attr('value', pln);
      $('#pldesc textarea').attr('value', pld + '\rMade by Playlist Merge http://playlistmerge.appspot.com');
    },

    addChosen: function(keyArray) {
      K.playlister.newListKeys= K.playlister.newListKeys.concat(keyArray);
    }
  };
  // +++++++++++++++++++
  $(document).ready(function() {
    K.init();
  });

})();
