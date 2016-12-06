'use strict'

//Import modules
const sequelize = require('sequelize')
const express = require ('express')
const bcrypt = require ('bcrypt-nodejs')


//define module

const db = {}
// Connect to database
db.conn = new sequelize ('goalify', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
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
db.Art.hasMany( db.Animal )//Multiple animals can be in one art piece
db.Animal.hasMany( db.Art )//One animal can be in multiple art pieces

//Create (sample) admin, sample art pieces, sample animals.
db.conn.sync( {force: true}).then( () => {

	//create admin
	bcrypt.hash('panda123', null, null, function(err, hash) {
		if (err) throw (err); 

		db.Admin.create( {
			email: 'selma2202',
			password: hash
		}) 
	})

	//create Art

	//create Animal
	console.log ('Synced, yay')
})

//export defined module
module.exports = db
