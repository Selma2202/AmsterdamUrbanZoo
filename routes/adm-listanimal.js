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



router.get('/adm-listanimal', function (req, res) {

	var user = req.session.user;
	var message = req.query.message;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent('You are currently not logged in as an admin.'))
	} else {
		db.Animal.findAll({
			order: [['name', 'ASC']]
		}).then( (animals) => {
			console.log('List animal page is now showing in the browser')
			res.render('adm-listanimal', {
				currentUser: user,
				message: message,
				allAnimals: animals
			})
		})
	}
});

router.post('/deleteanimal', (req, res) => {
	// let deleteId = req.query.id
	db.Animal.destroy({
		where: {
			id: req.query.id
		}
	}).then(function () {
		console.log('Animal deleted')
		res.redirect('/adm-listanimal?message=' + encodeURIComponent("The animal has been deleted."))
	})	 
})


//// Export
module.exports = router