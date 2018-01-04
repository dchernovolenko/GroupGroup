      // var map;
      var panorama;

      function initMap() {
        var latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
        var longitude = getRandomFloat(-180,180);
        var place = {lat: latitude, lng: longitude};
        var sv = new google.maps.StreetViewService();

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set the initial Street View camera to the center of the map
        sv.getPanorama({location: place, radius: 1400000}, processSVData);
      // panorama.set('addressControl', false);
        panorama.setVisible(false);

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

      function processSVData(data, status) {
        if (status === 'OK') {
          // var marker = new google.maps.Marker({
          //   position: data.location.latLng,
          //   // map: map,
          //   // title: data.location.description
          // });

          panorama.setPano(data.location.pano);
          // panorama.setPov({
          //   heading: 270,
          //   pitch: 0
          // });
          // panorama.set('addressControl', false);
          // panorama.setVisible(true);

          // marker.addListener('click', function() {
          //   var markerPanoID = data.location.pano;
          //   // Set the Pano to use the passed panoID.
          //   panorama.setPano(markerPanoID);
          //   panorama.setPov({
          //     heading: 270,
          //     pitch: 0
          //   });
          //   panorama.setVisible(true);
          // });
        } else {
          console.error('Street View data not found for this location.');
        }
      }