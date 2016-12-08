$(document).ready(function() {
    initMap();
    // if i want to work with geolocation, i can in stead put initlocationprocedure here
    // $(".button-collapse").sideNav();
});

// function initLocationProcedure() {
//     initMap()
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(displayAndWatch, locError, {enableHighAccuracy: true})
//     } else {
//         alert('Sorry, your browser does not support the Geolocation')
//     }
// }

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 52.380149, lng: 4.887603},
		zoom: 12
	});
}