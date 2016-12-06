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
	description: sequelize.STRING,
	dateSince: sequelize.STRING, //Of als integer doen? ligt er aan of ik alleen jaartallen doe
	material: sequelize.STRING,
	image: sequelize.STRING,
	lat: sequelize.STRING,
	lng: sequelize.STRING
})

db.Animal = db.conn.define ('animal', {
	name: sequelize.STRING,
	description: sequelize.STRING,
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

////Define relations
// db.Art.hasMany( db.Animal )//Multiple animals can be in one art piece
// db.Animal.hasMany( db.Art )//One animal can be in multiple art pieces

//Create (sample) admin, sample art pieces, sample animals.
db.conn.sync( {force: true}).then( () => {

	//create admin
	db.Admin.create( {
		email: 'b',
		password: 'b'
	})


	bcrypt.hash('a', null, null, function(err, hash) {
		if (err) throw (err); 

		db.Admin.create( {
			email: 'a',
			password: hash
		}) 
	})


	//create Art
	// db.Art.create ( {
	// 	artist: 'B. Pijper',
	// 	title: 'Drie dieren',
	// 	description: 'Met zijn stuk drie dieren probeert Bram uit te dragen hoe we allemaal in harmonie leven',
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
	// 		rangeContinent: 'Europa',
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
	// 		rangeContinent: 'Azie',
	// 		rangeCountry: 'China'
	// 	})
	// })

	//create Animal
	console.log ('Synced, yay')
})

//export defined module
module.exports = db
