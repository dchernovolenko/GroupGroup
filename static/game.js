    //   /*
    //    * Click the map to set a new location for the Street View camera.
    //    */
    //
    // //   var map;
    // function getRandomFloat(min, max) {
    //     return Math.random() * (max - min) + min;
    //   }
    //
    //   var panorama;
    //
    //   function initMap() {
    //     var latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
    //     var longitude = getRandomFloat(-180,180);
    //
    //     var berkeley = {lat: latitude, lng: longitude};
    //     var sv = new google.maps.StreetViewService();
    //
    //     panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
    //
    //     // Set up the map.
    //     // map = new google.maps.Map(document.getElementById('map'), {
    //     //   center: berkeley,
    //     //   zoom: 16,
    //     //   streetViewControl: false
    //     // });
    //
    //     // Set the initial Street View camera to the center of the map
    //     // panorama.set('addressControl', false);
    //     sv.getPanorama({location: berkeley, radius: 1400000}, processSVData);
    //
    //     // Look for a nearby Street View panorama when the map is clicked.
    //     // getPanoramaByLocation will return the nearest pano when the
    //     // given radius is 50 meters or less.
    //     // map.addListener('click', function(event) {
    //     //   sv.getPanorama({location: event.latLng, radius: 50}, processSVData);
    //     // });
    //   }
    //
    //   function processSVData(data, status) {
    //     if (status === 'OK') {
    //       var marker = new google.maps.Marker({
    //         position: data.location.latLng,
    //         // map: map,
    //         title: data.location.description
    //       });
    //
    //       panorama.setPano(data.location.pano);
    //     //   panorama.setPov({
    //     //     heading: 270,
    //     //     pitch: 0
    //     //   });
    //       panorama.setVisible(true);
    //       panorama.set('addressControl', false);
    //
    //     //   marker.addListener('click', function() {
    //     //     var markerPanoID = data.location.pano;
    //     //     // Set the Pano to use the passed panoID.
    //     //     panorama.setPano(markerPanoID);
    //     //     panorama.setPov({
    //     //       heading: 270,
    //     //       pitch: 0
    //     //     });
    //     //     panorama.setVisible(true);
    //     //   });
    //     } else {
    //       console.error('Street View data not found for this location.');
    //     }
    //   }

    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    function distance(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
      var map;
      var panorama;
      var marker;

      var landed_lat;
      var landed_lng;

      function initMap() {
        var latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
        var longitude = getRandomFloat(-180,180);

        var place = {lat: latitude, lng: longitude};
        var place2 = {lat: 0, lng: 0}; // for the map
        var sv = new google.maps.StreetViewService();

        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

        // Set up the map.
        map = new google.maps.Map(document.getElementById('map'), {
          center: place2,
          zoom: 2,
          streetViewControl: false
        });

        sv.getPanorama({location: place, radius: 1400000}, processSVData);

        //when the user clicks on the map
        map.addListener('click', function(event) {
          if (marker == undefined){
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                animation: google.maps.Animation.DROP, // just to be extra
            });
        }
        else{
            marker.setAnimation(google.maps.Animation.DROP);
            marker.setPosition(event.latLng);
        }
          console.log( 'user click latitude: ' + event.latLng.lat() + ', longitude: ' + event.latLng.lng() );
          console.log( distance(event.latLng.lat(), event.latLng.lng(), landed_lat, landed_lng) + ' km to goal' );
        });
      }

      function processSVData(data, status) {
        if (status === 'OK') {
          panorama.setPano(data.location.pano);
          landed_lat = data.location.latLng.lat();
          landed_lng = data.location.latLng.lng();
          panorama.setVisible(true);
          panorama.set('addressControl', false);
        } else {
          console.error('Street View data not found for this location.');
        }
      }
