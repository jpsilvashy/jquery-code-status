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
    // check that each of the providers is available
    var selectedProviders = availableProviders

    return this.each(function() {

      // change state
      $(this).html("loading...");

      // make json requests to each provider
      console.log(settings.providers);

      jQuery.each(selectedProviders, function(provider, baseUrl) {
        console.log(options);

        var url = baseUrl + options.repository
        console.log('make request to: ', url)

        // make requests
        // $.ajax({
        //   url: url,
        //   dataType: 'json',
        //   data: data,
        //   success: console.log('success', data)
        // });

        $.getJSON(url + '.json', function(data) {
          console.log('data: ', data)
        });

      });

    });

  };
})( jQuery );