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

	//Test marker + infowindow at my own home, no changing data involved.
	var homeContentString = '<br><br><strong>This is where Selma lives.</strong><br><br>'
	var infowindow = new google.maps.InfoWindow ({
		content: homeContentString
	})

	var marker = new google.maps.Marker({
		position: home,
		map: map,
		title: 'Home'
	});
	marker.addListener('click', function () {
		infowindow.open(map, marker);
	})
	google.maps.event.addListener(map, 'click', function () {
		infowindow.close();
	})



	$.getJSON('/json/artworks.json', function(artwork) {
		$.each(artwork, function(key, data) {
			console.log('----------------------------------')
				// console.log(data)
				for (var i = 0; i < data.animals.length; i++) {
					console.log(data.animals[i].name)
				}
				

				var artContentString =
				'<strong>Titel: </strong>' + data.title + '<br>' +
				'<strong>Beschrijving: </strong>' + data.description + '<br>' +
				'<strong>Voorkomende dieren: </strong>' + data.animals[0].name //nu hoe hier alle dieren die bij deze datatitel en beschrijving horen?
				var infowindow = new google.maps.InfoWindow ({
					content: artContentString
				})

				var artLatLng = new google.maps.LatLng(data.lat, data.lng)
            //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
            	position: artLatLng,
            	map: map,
            	title: data.title,
            })
            marker.addListener('click', function () {
            	infowindow.open(map, marker);
            })
        })
	})
}

