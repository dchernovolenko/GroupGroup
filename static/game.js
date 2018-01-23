function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// function get_us_coord() {
//
// }

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

//================Random Theme Based Location Code ============
function theme_locate() {
  $.ajax({
    type: "POST",
    url: "/theme/" + theme,
    async: false,
  }).done(function(response) {
     console.log(response);
     var obj = JSON.parse(response);
     console.log(typeof(obj));
     init_location = obj.place;
     if (theme == "us_cities") {
       init_location += ", US";
     }
     console.log(init_location);
  });
}

var sv;
var geocoder;
var map;
var panorama;
var sv;
var marker;

var latitude;
var longitude;
var theme_radius = 50;
var landed_lat;
var landed_lng;
var init_location;
var landed_location;
var user_score;
var count = 0; // to see how many API calls I wasted lmao
var place;
var theme = localStorage.getItem("theme"); //options are uni, us_cities, amusement (may not always work)
var mapResized = false;

// var on_land; // to know if the random coordinate is a land coordinate
var theme_toggle = parseInt(localStorage.getItem("theme_toggle"));

function initMap() {
  // var latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
  // var longitude = getRandomFloat(-180,180);

  console.log(theme);
  console.log("theme IO:")
  console.log(theme_toggle);
  theme_locate(); //defined up there, sets init_location to random theme location
  console.log('hello');
  // console.log(latitude);
  // console.log(longitude);

  place = {lat: latitude, lng: longitude};
  // console.log("the beginning: " + place.lat + ", " + place.lng);

  var place2 = {lat: 0, lng: 0}; // for the map
  sv = new google.maps.StreetViewService();

  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));

  // Set up the map.
  map = new google.maps.Map(document.getElementById('map'), {
    center: place2,
    zoom: 2,
    streetViewControl: false
  });
  google.maps.event.addListener(map, 'bounds_changed', function() {
    google.maps.event.trigger(map, 'resize');
  });
  google.maps.event.addListener(map, 'mousemove', function() {
    google.maps.event.trigger(map, 'resize');
  });
  window.addEventListener("resize", function(event) {
    google.maps.event.trigger(map, 'resize');
  });
  if (theme_toggle) {
    // increasingRadius(processSVDataTheme);
      geocodeAddress(init_location);
  }
  else {
    console.log("RANDOM");
    TryRandomLocation(processSVData);
  }
  //when the user clicks on the map
  map.addListener('click', marking);
}

function TryRandomLocation(callback) {
  // Try to find a panorama within 15000 metres
  latitude = getRandomFloat(-45,66); // avoiding the arctic circles and then some
  longitude = getRandomFloat(-180,180);
  sv.getPanorama({
      location: new google.maps.LatLng(latitude, longitude),
      radius: 15000
  }, callback);
}

function increasingRadius(callback) {
  // find a street view with increasing radius
  sv.getPanorama({
      location: new google.maps.LatLng(latitude, longitude),
      radius: theme_radius
  }, callback);
  console.log("theme radius: " + theme_radius);
  if (theme == "africa") {
    theme_radius += 1000;
  }
  else {
    theme_radius += 100;
  }
}

// putting the marker down at where the user clicks
function marking(event) {
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

  // distance from user click to actual place
  latitude = event.latLng.lat();
  longitude = event.latLng.lng();
  var distance_to_goal = distance(event.latLng.lat(), event.latLng.lng(), landed_lat, landed_lng);
  // scoring (half of Earth's circumference in km minus user click distance)
  // user_score = 20037.5 - distance_to_goal;
  var max_dist = 20037.5;
  if (theme_toggle == 0 || theme == "amusement" || theme == "world_capitals") {
    max_dist = 20037.5;
  }
  else if (theme == "us_cities" || theme == "uni"){
    max_dist = 4654; //thanks quora
    max_dist = distance(34, -117, 47.3, -68.5);
  }
  else if (theme == "africa") {
    max_dist = distance(35.8, -5.8, -32.8, 26.7); //dist between northeasternmost and southwesternmost places in africa
  }
  else if (theme == "asia") {
    max_dist = distance(13.4, 43.8, 68, 175.8); //southernwestermost to northerneastern most
  }
  else if (theme == "north_america") {
    max_dist = distance(70.8, -159.9, 8.12, -77.7);
  }
  else if (theme == "oceania") {
    max_dist = distance(-21.7, 114.3, -46.3, 169.9);
  }
  else if (theme == "europe") {
    max_dist = 5342.6; //thanks quora
  }
  else if (theme == "south_america") {
    max_dist = distance(11.48, -72.6, -54.9, -67);
  }



  user_score = Math.pow(5000, (max_dist - distance_to_goal) / max_dist);
  user_score = Math.round (user_score * 10) / 10;

  // putting a marker down activates the submit button
  document.getElementById("submit").disabled = false;
}


$( "button" ).click(function() {
  // so they can't submit again
  $( "button" ).remove();
  // making a marker at the correct spot, marked "B"
  var endMark = new google.maps.Marker({
	position: {lat: landed_lat, lng: landed_lng},
	map:map,
	label: "B",
});

  // determining the score
  var score = document.getElementById("score");
  console.log( 'score: ' + user_score );
  score.innerHTML = '<h1>you scored ' + user_score + " out of 5000</h1>";
  //resizing map
  document.getElementById("wrpr").style.top = "56px";
  document.getElementById("wrpr").style.width = "100%";
  document.getElementById("wrpr").style.height = "100%";
  document.getElementById("controls").style.width = "100%";
  document.getElementById("controls").style.height = "100%";
  document.getElementById("map").style.cssText = null;
  document.getElementById("map").style.height = "100%";
  document.getElementById("map").style.width = "100%";
   var end = new google.maps.LatLng(landed_lat,landed_lng);
  var start = new google.maps.LatLng(latitude,longitude);
  var bounds = new google.maps.LatLngBounds();
    bounds.extend(end);
    bounds.extend(start);
   setTimeout(function () {
    map.fitBounds(bounds);
     google.maps.event.trigger(map, "resize");
     console.log("thing2");
        google.maps.event.clearListeners(map, 'click');
   }, 200);
  $.ajax({
    url: '/addScore',
    type: 'GET',
    data: {"score": user_score},
    success: function(response){
      console.log(response);
    },
    error: function(error){
      console.log(error);
    }
  });

});

function geocodeAddress(location) {
  geocoder = new google.maps.Geocoder()
  geocoder.geocode({'address': location}, function(results, status) {
    if (status === 'OK') {
      latitude = results[0].geometry.location.lat();
      longitude = results[0].geometry.location.lng();
      console.log("geocode latitude: " + results[0].geometry.location.lat() + ", " + "longitude: " + + results[0].geometry.location.lng())
      increasingRadius(processSVDataTheme);
    } else {
      theme_locate();
      geocodeAddress(init_location);
      console.log("finding another place in theme...");
    }
  });
}



function processSVDataTheme(data, status) {
  if (status === 'OK') {
    panorama.setPano(data.location.pano);
    landed_lat = data.location.latLng.lat();
    landed_lng = data.location.latLng.lng();
    panorama.set('addressControl', false);
    panorama.set('showRoadLabels', false);
    panorama.setVisible(true);

    console.log("yay landed on a theme street view! Took " + count + " tries");
    count = 0;
  } else {
    if (count == 30){
      count = 0;
      theme_radius = 50;
      theme_locate();
      geocodeAddress(init_location);
      console.log("taking more than 30 tries, finding another place instead...");
    }
    else{
      console.log("increasing radius...");
      increasingRadius(processSVDataTheme)
      count++;
    }
  }
}

function processSVData(data, status) {
  if (status === 'OK') {
    panorama.setPano(data.location.pano);
    landed_lat = data.location.latLng.lat();
    landed_lng = data.location.latLng.lng();
    panorama.set('showRoadLabels', false);
    panorama.set('addressControl', false);
    panorama.setVisible(true);

    console.log("YAY! " + data.location.latLng.lat() + ", " + data.location.latLng.lng());
    console.log("took " + count + " tries");
    count = 0;
  } else {
    // longitude++;
    count++;
    console.log("getting a good location...");
    TryRandomLocation(processSVData);
  }
}
