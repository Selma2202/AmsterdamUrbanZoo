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

	//////////////// TEST MARKER + infowindow at my own home, no changing data involved.
	// var homeContentString = '<br><br><strong>This is where Selma lives.</strong><br><br>'
	// var infowindow = new google.maps.InfoWindow ({
	// 	content: homeContentString
	// })
	// var marker = new google.maps.Marker({
	// 	position: home,
	// 	map: map,
	// 	title: 'Home'
	// });
	// marker.addListener('click', function () {
	// 	infowindow.open(map, marker);
	// })
	// google.maps.event.addListener(map, 'click', function () {
	// 	infowindow.close();
	// })



	$.getJSON('/json/artworks.json', function(artwork) {
		$.each(artwork, function(key, data) {
			console.log('----------------------------------')
				// console.log(data)

				//adding artwork information to infowwindow
				var artContentString =
				'<strong>Titel: </strong>' + data.title + '<br>' +
				'<strong>Beschrijving: </strong>' + data.description + '<br>' 

				// preparing empty variables to load in the infowindow when filled
				var animalContentString = ''
				var correspondingAnimals = ''

				for (var i = 0; i < data.animals.length; i++) {
					
					if (data.animals[i].length !== 0) {
						//adding info about the animals in the artworks
						correspondingAnimals = correspondingAnimals + data.animals[i].name + ', '

						animalContentString = animalContentString + (
							'<strong>Naam: </strong>' + data.animals[i].name + '<br>' +
							'<strong>Beschrijving: </strong>' + data.animals[i].description + '<br><br>'
							)
					}
				}

				//Making the infowindow itself and loading the content
				var infowindow = new google.maps.InfoWindow ({
					content: 
					'<h5>Kunstwerk</h5>' +
					artContentString + 
					'<strong>Dieren in dit kunstwerk: </strong>' + correspondingAnimals + '<br><br>' + 
					'<h5>Dieren</h5>' +	
					animalContentString
					//this proves content can consist of multiple variables, making it easier to make them.
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

