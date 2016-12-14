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

//create custom overlay
var styledMapType = new google.maps.StyledMapType(

	// [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
	// DEZE NIET [{"stylers":[{"hue":"#baf4c4"},{"saturation":10}]},{"featureType":"water","stylers":[{"color":"#effefd"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]}]
	// [{"stylers":[{"hue":"#16a085"},{"saturation":0}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]}]
	//DEZE MISSCHIEN 
	// [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"on"},{"color":"#716464"},{"weight":"0.01"}]},{"featureType":"administrative.country","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape.natural.landcover","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"simplified"},{"color":"#a05519"},{"saturation":"-13"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"color":"#84afa3"},{"lightness":52}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"}]}]
	// [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"saturation":"-65"},{"lightness":"45"},{"gamma":"1.78"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"saturation":"-33"},{"lightness":"22"},{"gamma":"2.08"}]},{"featureType":"transit.station.airport","elementType":"geometry","stylers":[{"gamma":"2.08"},{"hue":"#ffa200"}]},{"featureType":"transit.station.airport","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"visibility":"simplified"},{"saturation":"-55"},{"lightness":"-2"},{"gamma":"1.88"},{"hue":"#ffab00"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#bbd9e5"},{"visibility":"simplified"}]}]
	// WORKING SCHEME:
	[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#ffebc5"},{"lightness":"-10"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#b70046"}]},{"featureType":"administrative.province","elementType":"geometry.fill","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#675a4b"},{"weight":"0.50"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"darkgrey"}]},{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"saturation":"-71"},{"lightness":"-2"},{"color":"#ffebc5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#70bfaf"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#675a4c"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#675a4b"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7ccff0"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#cfeae4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#109579"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]}]

	)
{name: 'Styled Map'}
;



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
				console.log(data.title)

				//adding artwork information to infowwindow
				var artLatLng = new google.maps.LatLng(data.lat, data.lng)
				var markerIcon = '/images/testgoogleicon2.png'
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
						console.log(data.animals[0].description)
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
				'<img class="mapsimages" src="/images/database/' + data.image + '.jpg"><br>'

				infowindow.setContent('<div class=infowindowdiv><h5>Kunstwerk</h5>' + artContentString + 
					'<strong>Dieren in dit kunstwerk: </strong>' + correspondingAnimals + '<br><br>' + 
					'<h5>Dieren</h5>' +	
					animalContentString + '</div>')
				infowindow.open(map, this);
			})

			//close infowindow when clicking somewhere on the map
			google.maps.event.addListener(map, 'click', function () {
				infowindow.close();
			})
		})
})


map.mapTypes.set('styled_map', styledMapType);
map.setMapTypeId('styled_map'); 
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
