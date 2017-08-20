'use strict'

//Import modules
const sequelize = require('sequelize')
const express = require ('express')
const bcrypt = require ('bcrypt-nodejs')


//define module

const db = {}
// Connect to database
db.conn = new sequelize ('urbanzoo', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
})

//Define database structure

////Define models
//////For the main functionality of the app
db.Art = db.conn.define ('art', {
	artist: sequelize.STRING,
	title: sequelize.STRING,
	description: sequelize.TEXT,
	dateSince: sequelize.STRING, 
	material: sequelize.STRING,
	image: sequelize.STRING,
	lat: sequelize.STRING,
	lng: sequelize.STRING,
	animal: sequelize.STRING
})

db.Animal = db.conn.define ('animal', {
	name: sequelize.STRING,
	description: sequelize.TEXT,
	latinName: sequelize.STRING,
	family: sequelize.STRING,
	class: sequelize.STRING,
	size: sequelize.STRING, //this way I can use stripes (5-10cm)
	weight: sequelize.STRING,
	rangeContinent: sequelize.STRING,
	rangeCountry: sequelize.STRING
})

//////To be able for some to add new information
db.Admin = db.conn.define ('admin', {
	email: { type: sequelize.STRING, unique: true },
	password: sequelize.STRING
})

db.Appearence = db.conn.define('appearence', {

})

////Define relations
//The relation can not be hasMany bothways (even though multiple animals can be in one art piece, and one animal can be in multiple art pieces) because sequelize would then break. Only one needs to be defined, so we can get the animals by including the model in the other model
db.Art.hasMany( db.Animal )//Multiple animals can be in one art piece
db.Animal.belongsToMany( db.Art, { through: 'animallink' } )
// db.Animal.belongsToMany( db.Art, {through: db.Appearence} )//One animal can be in multiple art pieces

//Create (sample) admin, sample art pieces, sample animals.
db.conn.sync( {force: false}).then( () => {


/////Deze testdata veroorzaakt een fout bij opstarten van de app, dus deze wordt even uitgecomment
	//create admin
	// db.Admin.create( {
	// 	email: 'b',
	// 	password: 'b'
	// })
	// bcrypt.hash('a', null, null, function(err, hash) {
	// 	if (err) throw (err); 

	// 	db.Admin.create( {
	// 		email: 'a',
	// 		password: hash
	// 	}) 
	// })
/////Einde uitgecommente testdata

//TESTDATA
	//create Art
	// db.Art.create ( {
	// 	artist: 'Testy boy',
	// 	title: 'Geen dieren',
	// 	description: 'Met dit kunstwerk proberen we te testen of de boel niet crasht als er geen dieren gedefinieerd zijn.',
	// 	dateSince: '2008', //Of als integer doen? ligt er aan of ik alleen jaartallen doe
	// 	material: 'hout',
	// 	image: 'no image yet',
	// 	lat: '52.351279',
	// 	lng: '4.869950'
	// })

	// db.Art.create ( {
	// 	artist: 'B. Pijper',
	// 	title: 'Twee dieren',
	// 	description: 'Met zijn stuk twee dieren probeert Bram uit te dragen hoe we allemaal in harmonie leven',
	// 	dateSince: '2008', //Of als integer doen? ligt er aan of ik alleen jaartallen doe
	// 	material: 'hout',
	// 	image: 'no image yet',
	// 	lat: '52.358279',
	// 	lng: '4.865050'
	// }).then(art => {
	// 	art.createAnimal ({
	// 		name: 'eend',
	// 		description: 'Een eend zegt kwak',
	// 		latinName: 'Duckus Magnificus',
	// 		family: 'eendachtigen',
	// 		class: 'vogels',
	// 		size: '10 cm', //this way I can use stripes (5-10cm)
	// 		weight: '2 kilo',
	// 		rangeContinent: ['Europa'],
	// 		rangeCountry: 'Nederland'
	// 	})
	// 	art.createAnimal ({
	// 		name: 'kat',
	// 		description: 'Een kat zegt miauw',
	// 		latinName: 'Kattius Magnificus',
	// 		family: 'katachtigen',
	// 		class: 'zoogdieren',
	// 		size: '20 cm', //this way I can use stripes (5-10cm)
	// 		weight: '2,5 kilo',
	// 		rangeContinent: ['Azie'],
	// 		rangeCountry: 'China'
	// 	})
	// })

	// db.Art.create ( {
	// 	artist: 'Selma D.',
	// 	title: 'Pandatoren',
	// 	description: 'Door een toren te bouwen van 1200 panda\'s, toont Selma met dit kunstwerk de hoeveelheid panda\'s die nog in het wild voorkomen',
	// 	dateSince: '2010', //Of als integer doen? ligt er aan of ik alleen jaartallen doe
	// 	material: 'keramiek',
	// 	image: 'no image yet',
	// 	lat: '52.363905',
	// 	lng: '4.848910'
	// }).then(art => {
	// 	art.createAnimal ({
	// 		name: 'panda',
	// 		description: 'Panda\'s zijn zwart-wit.',
	// 		latinName: 'Pandus Magnificus',
	// 		family: 'beerachtigen',
	// 		class: 'zoogdieren',
	// 		size: '1 m', //this way I can use stripes (5-10cm)
	// 		weight: '20 kilo',
	// 		rangeContinent: ['Azië'],
	// 		rangeCountry: 'China'
	// 	})
	// })

	// db.Art.create ( {
	// 	artist: 'Manon',
	// 	title: 'Drie gekkies',
	// 	description: 'Een drijvende, speelse samenwerking tussen paard, ezel en kameel.',
	// 	dateSince: '2005', //Of als integer doen? ligt er aan of ik alleen jaartallen doe
	// 	material: 'plastic',
	// 	image: 'no image yet',
	// 	lat: '52.379848',
	// 	lng: '4.907349'
	// }).then(art => {
	// 	art.createAnimal ({
	// 		name: 'paard',
	// 		description: 'Een paard heeft benen ipv poten',
	// 		latinName: 'Paardus Magnificus',
	// 		family: 'paardachtigen',
	// 		class: 'zoogdieren',
	// 		size: '1,5 m', //this way I can use stripes (5-10cm)
	// 		weight: '29 kilo',
	// 		rangeContinent: ['Europa'],
	// 		rangeCountry: 'België'
	// 	})
	// 	art.createAnimal ({
	// 		name: 'ezel',
	// 		description: 'Een ezel zegt i-a',
	// 		latinName: 'Ezelus Magnificus',
	// 		family: 'paardachtigen',
	// 		class: 'zoogdieren',
	// 		size: '1,5 m', //this way I can use stripes (5-10cm)
	// 		weight: '15 kilo',
	// 		rangeContinent: ['Europa'],
	// 		rangeCountry: 'Frankrijk'
	// 	})
	// 	art.createAnimal ({
	// 		name: 'kameel',
	// 		description: 'Een kameel heeft twee bulten, een dromedaris maar één.',
	// 		latinName: 'Kamelus Magnificus',
	// 		family: 'kameelachtigen',
	// 		class: 'zoogdieren',
	// 		size: '205 cm', //this way I can use stripes (5-10cm)
	// 		weight: '30 kilo',
	// 		rangeContinent: ['Afrika'],
	// 		rangeCountry: 'Zuid-Afrika'
	// 	})
	// })



	// //To check whether it works
	// setTimeout(() => {
	// 	db.Art.findAll({
	// 		include: [{
	// 			model: db.Animal,
	// 			// where: {name: 'kat'},
	// 		}]
	// 	}).then(arts => {
	// 		console.log(arts)
	// 		console.log(arts[0].animals[0].name)//kat
	// 		console.log(arts[0].animals[0].description)//Een kat zegt miauw
	// 		console.log(arts[1].animals[0].name)//panda
	// 		console.log(arts[1].animals[0].description)//Panda's zijn zwart-wit.
	// 		console.log(arts[2].animals[2].name)//paard
	// 		console.log(arts[2].animals[2].description)//Een paard heeft benen ipv poten
	// 		console.log(arts[2].animals[0].name)//kameel
	// 		console.log(arts[2].animals[0].description)//Een kameel heeft twee bulten, een dromedaris maar één.
	// 	})
	// }, 2000)






	// setTimeout(() => {
	// 	db.Animal.findAll({
	// 		include: [db.Art]
	// 	}).then(animals => {
	// 		console.log(animals[0])
	// 	})
	// }, 3000)

	//create Animal
	console.log ('Synced, yay')
})

//export defined module
module.exports = db
