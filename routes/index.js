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
	var message = req.query.message;
// 	fs.writeFile (__dirname + '/../static/json/artworks.json', 'does this work', 'utf-8', function(error) { //JSON.stringify (mapArtworks)
// 		if(error) throw error
// 			console.log(error)
// 		console.log("it's saved!")
		

// 	})
// 	res.render('index', {message: message})

// })





	db.Art.findAll({
		include: [{
			model: db.Animal
		}]
	})
	.then( (artworks) =>{
		let artArray = []
		for (var i = artworks.length - 1; i >= 0; i--) {
			artArray.push(artworks[i])
		}
		console.log ('##############################################')
		console.log (artArray)
		return artArray
	})
	.then( (mapArtworks) => {
		console.log ('---------------------------------------')
		console.log (mapArtworks)
		fs.writeFile (__dirname + '/../static/json/artworks.json', JSON.stringify (mapArtworks), 'utf-8', function(error) { 
			if(error) throw error
				console.log(error)
			console.log("it's saved!")

		})
	})
	.then ( () => {
		console.log('index page is now showing in the browser')
		res.render('index', {message: message})
	})



});

//// Export
module.exports = router