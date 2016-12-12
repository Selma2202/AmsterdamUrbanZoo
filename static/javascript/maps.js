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

//Hieronder weer ontcommenten als ik met testdata werken wil

// 	$.getJSON('/json/artworks.json', function(artwork) {
// 		$.each(artwork, function(key, data) {
// 			console.log('----------------------------------')
// 				// console.log(data)

// 				//adding artwork information to infowwindow
// 				var artContentString =
// 				'<strong>Titel: </strong>' + data.title + '<br>' +
// 				'<strong>Beschrijving: </strong>' + data.description + '<br>' 

// 				// preparing empty variables to load in the infowindow when filled
// 				var animalContentString = ''
// 				var correspondingAnimals = ''

// 				for (var i = 0; i < data.animals.length; i++) {
					
// 					if (data.animals[i].length !== 0) {
// 						//adding info about the animals in the artworks
// 						correspondingAnimals = correspondingAnimals + data.animals[i].name + ', '

// 						animalContentString = animalContentString + (
// 							'<strong>Naam: </strong>' + data.animals[i].name + '<br>' +
// 							'<strong>Beschrijving: </strong>' + data.animals[i].description + '<br><br>'
// 							)
// 					}
// 				}

// 				//Making the infowindow itself and loading the content
// 				var infowindow = new google.maps.InfoWindow ({
// 					content: 
// 					'<h5>Kunstwerk</h5>' +
// 					artContentString + 
// 					'<strong>Dieren in dit kunstwerk: </strong>' + correspondingAnimals + '<br><br>' + 
// 					'<h5>Dieren</h5>' +	
// 					animalContentString
// 					//this proves content can consist of multiple variables, making it easier to make them.
// 				})

// 				var artLatLng = new google.maps.LatLng(data.lat, data.lng)
//             //Creating a marker and putting it on the map. 
//             var marker = new google.maps.Marker({
//             	position: artLatLng,
//             	map: map,
//             	title: data.title,
//             })
//             marker.addListener('click', function () {
//             	infowindow.open(map, marker);
//             })
//         })
// 	})
// }


///////////// TESTING to see whether i can upload a csv converted to json. 
//Answer: yes i can, fortunately, however I will still have to figure out how to connect the animals to this as well.
//If i want to try again to see how this looks, i can comment out the part above (from getJSON onwards) and leave this part open.
//TIPS TO SELF by maken van nieuwe json: 
// let op lat/lng, welke is welke. 
// Let op dat het met puntje is, niet met komma. 
// Let op dat ze niet geconvert worden naar E+16 op het eind. 
// Let op dat titels hetzelfde zijn als in de database. 
// Kies hier bij input options "first row is column names" http://www.convertcsv.com/csv-to-json.htm
	$.getJSON('/json/testdata_10stuks.json', function(artwork) {
		$.each(artwork, function(key, data) {

				//adding artwork information to infowwindow
				var artContentString =
				'<strong>Kunstenaar: </strong>' + data.artist + '<br>' +
				'<strong>Titel: </strong>' + data.title + '<br>' +
				'<strong>Beschrijving: </strong>' + data.description + '<br>' +
				'<img class="mapsimages" src="/images/database/' + data.image + '"><br>'


				var infowindow = new google.maps.InfoWindow ({
					content: 
					'<h5>Kunstwerk</h5>' +
					artContentString 
				})
				console.log(data.lat)
				console.log(data.lng)
				var artLatLng = new google.maps.LatLng(data.lat, data.lng)
				var markerIcon = '/images/testgoogleicon.png'
            //Creating a marker and putting it on the map. 
            var marker = new google.maps.Marker({
            	position: artLatLng,
            	map: map,
            	title: data.title,
            	icon: markerIcon
            })
            marker.addListener('click', function () {
            	infowindow.open(map, marker);
            })
        })
	})
}
