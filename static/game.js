      // var map;
      // var panorama;

      function initMap() {
        var latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
        var longitude = getRandomFloat(-180,180);
        var place = {lat: latitude, lng: longitude};
        var sv = new google.maps.StreetViewService();

        // panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
        // panorama.set('addressControl', false);

        // Set the initial Street View camera to the center of the map
        // sv.getPanorama({location: place, radius: 1400000}, processSVData);
        sv.getPanorama({location: place, radius: 1400000});

        // Look for a nearby Street View panorama when the map is clicked.
        // getPanoramaByLocation will return the nearest pano when the
        // given radius is 1400000 meters or less.
        // map.addListener('click', function(event) {
        //   sv.getPanorama({location: event.latLng, radius: 1400000}, processSVData);
        // });
      }

      // for generating random coordinates
      function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
      }