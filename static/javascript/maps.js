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

	var infowindow = new google.maps.InfoWindow() 

	$.getJSON('/json/artworks.json', function(artwork) {
		$.each(artwork, function(key, data) {
			console.log('----------------------------------')
				// console.log(data)

				//adding artwork information to infowwindow
				var artLatLng = new google.maps.LatLng(data.lat, data.lng)
				var markerIcon = '/images/testgoogleicon.png'
				//Creating a marker and putting it on the map. 
				var marker = new google.maps.Marker({
					position: artLatLng,
					map: map,
					title: data.title,
					icon: markerIcon
				})

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

				google.maps.event.addListener(marker, 'click', function() {
				//adding artwork information to infowwindow
				var artContentString =
				'<strong>Kunstenaar: </strong>' + data.artist + '<br>' +
				'<strong>Titel: </strong>' + data.title + '<br>' +
				'<strong>Beschrijving: </strong>' + data.description + '<br>' +
				'<img class="mapsimages" src="/images/database/' + data.image + '"><br>'

				infowindow.setContent('<h5>Kunstwerk</h5>' + artContentString)
				infowindow.open(map, this);
			})

			//close infowindow when clicking somewhere on the map
			google.maps.event.addListener(map, 'click', function () {
				infowindow.close();
			})
		})
	})
}



	///////////// TESTING to see whether i can upload a csv converted to json. 
	//Answer: yes i can, fortunately, however I will still have to figure out how to connect the animals to this as well.
	//If i want to try again to see how this looks, i can comment out the part above (from getJSON onwards) and leave this part open.
	//TIPS TO SELF by maken van nieuwe json: 
	// let op lat/lng, welke is welke. 
	// Let op dat het met puntje is, niet met komma. 
	// Let op dat ze niet geconvert worden naar E+16 op het eind. 
	// Let op dat titels hetzelfde zijn als in de database. 
	// Kies hier bij input options "first row is column names" http://www.convertcsv.com/csv-to-json.htm




// 	var infowindow = new google.maps.InfoWindow() 

// 	$.getJSON('/json/testdata_10stuks.json', function(artwork) {
// 		$.each(artwork, function(key, data) {

// 			var artLatLng = new google.maps.LatLng(data.lat, data.lng)
// 			var markerIcon = '/images/testgoogleicon.png'
// 			//Creating a marker and putting it on the map. 
// 			var marker = new google.maps.Marker({
// 				position: artLatLng,
// 				map: map,
// 				title: data.title,
// 				icon: markerIcon
// 			})

// 			google.maps.event.addListener(marker, 'click', function() {
// 				//adding artwork information to infowwindow
// 				var artContentString =
// 				'<strong>Kunstenaar: </strong>' + data.artist + '<br>' +
// 				'<strong>Titel: </strong>' + data.title + '<br>' +
// 				'<strong>Beschrijving: </strong>' + data.description + '<br>' +
// 				'<img class="mapsimages" src="/images/database/' + data.image + '"><br>'

// 				infowindow.setContent('<h5>Kunstwerk</h5>' + artContentString)
// 				infowindow.open(map, this);
// 			})

// 			//close infowindow when clicking somewhere on the map
// 			google.maps.event.addListener(map, 'click', function () {
// 				infowindow.close();
// 			})
// 		})
// 	})
// }
