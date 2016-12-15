 'use strict'

//// IMPORT STUFF
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const fs 			= require('fs')
//Import possible own modules
let db = require(__dirname + '/../modules/database')
//for this file
const router = express.Router ( ) 



router.get('/index', function (req, res) {
// db.Art.findAll({
// 	include: [{
// 		model: db.Animal
// 	}]
// })
// .then( (artworks) =>{
// 	let artArray = []
// 	for (var i = artworks.length - 1; i >= 0; i--) {
// 		artArray.push(artworks[i])
// 	}
// 	return artArray
// })
// .then( (mapArtworks) => {
// 	fs.writeFile (__dirname + '/../static/json/artworks.json', JSON.stringify (mapArtworks), 'utf-8', function(error) { 
// 		if(error) throw error
// 			console.log(error)
// 		console.log("it's saved!")
// 	})
// })
// .then ( () => {
	console.log('index page is now showing in the browser')
	res.render('index')
})
// });


router.get('/showall', (req, res)=> {
	db.Art.findAll({
		include: [{
			model: db.Animal
		}]
	}).then( ( allArtworks ) => {
		for (var i = 0; i < allArtworks.length; i++) {
			console.log('The "animal"-string in artworks has this many characters: ' + allArtworks[i].animal.length)
		}
		res.send( allArtworks )
	})


	// findall => res.send( allofthem )
})

//// Export
module.exports = router