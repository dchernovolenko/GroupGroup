var us_button = document.getElementById("theme-1-button-us");
var uni_button = document.getElementById("theme-2-button-uni");



var setus = function(e) {
  console.log("setting theme to US");
  localStorage.setItem("theme", "us_cities");
}

var setuni = function(e) {
  console.log("setting theme to uni");
  localStorage.setItem("theme", "uni");
}

us_button.addEventListener("click", setus);
uni_button.addEventListener("click", setuni);
