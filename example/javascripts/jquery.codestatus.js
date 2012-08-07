(function( $ ){

  $.fn.codeStatus = function( options ) {

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      providers: [ 'travisci' ]
    }, options);

    // make sure the user has at least supplied a repository
    if (options.hasOwnProperty("repository") == false) {
      console.error('You must specify a repository');
    };

    // array of all supported providers
    var availableProviders = {
      travisci: 'http://travis-ci.org/',
      gemnasium: 'https://gemnasium.com/'
    };

    // selected providers
    // FIXME: check that each of the providers is available
    var selectedProviders = availableProviders

    $.each(selectedProviders, function(provider, baseUrl) {
      if (provider == 'travisci') {
        var link = $('<a />').addClass('codestatus-provider-travisci').attr('href', baseUrl + settings.repository);
        var role = $('<span />').text('Build Status').addClass('codestatus-role');
        var state = $('<span />').text('Loading').addClass('codestatus-state');

        link.append(role, state);
        $('#codestatus').append(link);
      }

      if (provider == 'gemnasium') {
        console.error('gemnasium not yet supported');
      }

    });


    return this.each(function() {

      // make json requests to each provider
      $.each(selectedProviders, function(provider, baseUrl) {
        console.log(options);

        var url = baseUrl + options.repository

        // make request
        $.ajax({
          url: url + '.json',
          dataType: 'jsonp',
          success: function(data) {
            if (provider == 'travisci') {
              if (data.last_build_result == 0) {
                $('.codestatus-provider-travisci').addClass('codestatus-ok');
                $('.codestatus-provider-travisci .codestatus-state').text("Passed");
              } else {
                $('.codestatus-provider-travisci').addClass('codestatus-ok');
                $('.codestatus-provider-travisci .codestatus-state').text("Passed");
              }
            } else {
              console.log("only travisci is supported at the time")
            }
          }
        });


      });

    });

  };
})( jQuery );