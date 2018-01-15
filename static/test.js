var panorama;
var sv;

var lat = (Math.random() * 90) - 90;
var lng = (Math.random() * 180) - 180;

var count = 0;

function first(){
  panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'));
  sv = new google.maps.StreetViewService();
  TryRandomLocation(HandleCallback);
}
function TryRandomLocation(callback) {
  // Try to find a panorama within 50 metres 
  sv.getPanorama({
      location: new google.maps.LatLng(lat, lng),
      radius: 10000
  }, callback);
}

function HandleCallback(data, status) {
    if (status == 'OK') {
      // Call your code to display the panorama here.
      panorama.setPano(data.location.pano);
      panorama.setVisible(true);
      panorama.set('addressControl', false);
      console.log("YAY! " + data.location.latLng.lat() + ", " + data.location.latLng.lng());
      console.log("took " + count + " tries");
    } else {
      // Nothing here! Let's try another location.
      lng++;
      count++;
      console.log("getting a good location...");
      TryRandomLocation(HandleCallback);
    }
}

window.onload = function() {
  first();
}