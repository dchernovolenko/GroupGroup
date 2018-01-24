$("#dummy").hide();

var normal_button = document.getElementById("normal");
var us_button = document.getElementById("theme-1-button-us");
var uni_button = document.getElementById("theme-2-button-uni");
var amuse_button = document.getElementById("theme-3-button-amusement");
var afri_button = document.getElementById("theme-4-button-africa");
var asia_button = document.getElementById("theme-5-button-asia");
var noam_button = document.getElementById("theme-6-button-north-america");
var euro_button = document.getElementById("theme-7-button-europe");
var ocea_button = document.getElementById("theme-8-button-oceania");
var woca_button = document.getElementById("theme-9-button-world-capitals");
var soam_button = document.getElementById("theme-10-button-south-america");



localStorage.setItem("theme_toggle", 0);


var setnorm = function(e) {
  console.log("toggling off");
  localStorage.setItem("theme_toggle", 0);
  console.log("turning off theme");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setus = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to US");
  localStorage.setItem("theme", "us_cities");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setuni = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to uni");
  localStorage.setItem("theme", "uni");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setamus = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to amusement parks");
  localStorage.setItem("theme", "amusement");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setafri = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to africa");
  localStorage.setItem("theme", "africa");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setasia = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to asia");
  localStorage.setItem("theme", "asia");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setnoam = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to north america");
  localStorage.setItem("theme", "north_america");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var seteuro = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to europe");
  localStorage.setItem("theme", "europe");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setocea = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to oceania");
  localStorage.setItem("theme", "oceania");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setwoca = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to world capitals");
  localStorage.setItem("theme", "world_capitals");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

var setsoam = function(e) {
  console.log("toggling on");
  localStorage.setItem("theme_toggle", 1);
  console.log("setting theme to south america");
  localStorage.setItem("theme", "south_america");
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

normal_button.addEventListener("click", setnorm);
us_button.addEventListener("click", setus);
uni_button.addEventListener("click", setuni);
amuse_button.addEventListener("click", setamus);
afri_button.addEventListener("click", setafri);
asia_button.addEventListener("click", setasia);
noam_button.addEventListener("click", setnoam);
euro_button.addEventListener("click", seteuro);
ocea_button.addEventListener("click", setocea);
woca_button.addEventListener("click", setwoca);
soam_button.addEventListener("click", setsoam);
