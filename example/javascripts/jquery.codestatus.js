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
      // gemnasium: 'https://gemnasium.com/'
    };

    // selected providers
    // check that each of the providers is available
    var selectedProviders = availableProviders

    return this.each(function() {

      // change state
      // $(this).html("loading...");

      // make json requests to each provider
      console.log(settings.providers);

      jQuery.each(selectedProviders, function(provider, baseUrl) {
        console.log(options);

        var url = baseUrl + options.repository
        console.log('make request to: ', url)

        // make request
        $.ajax({
          url: url + '.json',
          dataType: 'jsonp',
          success: function(data) {
            if (data.last_build_result == 0) {
              console.log('Passed');
            } else {
              console.log('Failed');
            }
          }
        });

        // build html object and insert it
        // this should be in the scope of the *this* from the outer function
        // that way we can hook on to the same html object that called the
        // function, this is hacked right now.
        $('#codestatus').append('append')

      });

    });

  };
})( jQuery );