var us_button = document.getElementById("theme-1-button-us");
var uni_button = document.getElementById("theme-2-button-uni");
var normal_button = document.getElementById("normal");
localStorage.setItem("theme_toggle", 0);


var setnorm = function(e) {
  console.log("toggling off");
  localStorage.setItem("theme_toggle", 0);
  console.log("turning off theme");
}

var setus = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to US");
  localStorage.setItem("theme", "us_cities");
}

var setuni = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to uni");
  localStorage.setItem("theme", "uni");
}

us_button.addEventListener("click", setus);
uni_button.addEventListener("click", setuni);
normal_button.addEventListener("click", setnorm);
