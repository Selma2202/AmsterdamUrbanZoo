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
var home = {lat: 52.373522, lng: 4.858905};

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 52.380149, lng: 4.887603},
		zoom: 12
		// https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		// nog andere properties die niet verplichtz ijn
	});
	var marker = new google.maps.Marker({
          position: home,
          map: map
        });
}

