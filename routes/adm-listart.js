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



router.get('/adm-listart', function (req, res) {

	var user = req.session.user;
	var message = req.query.message;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent('You are currently not logged in as an admin.'))
	} else {
		db.Art.findAll({
			order: [['title', 'ASC']]
		}).then( (artworks) => {
			console.log('List art page is now showing in the browser')
			res.render('adm-listart', {
				currentUser: user,
				message: message,
				allArtworks: artworks
			})
		})
	}
});

router.post('/deleteart', (req, res) => {
	// let deleteId = req.query.id
	db.Art.destroy({
		where: {
			id: req.query.id
		}
	}).then(function () {
		console.log('Artwork deleted')
		res.redirect('/adm-listart?message=' + encodeURIComponent("The artwork has been deleted."))
	})	 
})


//// Export
module.exports = router