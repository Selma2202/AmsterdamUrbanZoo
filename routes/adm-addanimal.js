'use strict'

//// IMPORT STUFF
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
//Import possible own modules
let db = require(__dirname + '/../modules/database')
//for this file
const router = express.Router ( ) 



router.get('/adm-addanimal', function (req, res) {

	var user = req.session.user;
	var message = req.query.message;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent('You are currently not logged in as an admin.'))
	} else {
		console.log('Add animal page is now showing in the browser')
		res.render('adm-addanimal', {message: message, currentUser: user})
	}
});

router.post('/adm-addanimal', function (req, res) {
	console.log(req.body.name)
	db.Animal.create({
		name: req.body.name,
		description: req.body.description,
		latinName: req.body.latinname,
		family: req.body.family,
		class: req.body.class,
		size: req.body.size,
		weight: req.body.weight,
		rangeContinent: req.body.rangecontinent,
		rangeCountry: req.body.rangecountry
	}).then(function () {
		db.conn.sync().then( () => {
			console.log('animal added')
			res.redirect('/adm-addanimal?message=' + encodeURIComponent("The animal has been added."))
		})
	})
})


//// Export
module.exports = router