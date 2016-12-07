'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )


let db = require(__dirname + '/../modules/database')

router.get('/adm-editanimal', (req, res) => {
	var user = req.session.user;
	// var id = req.query.id;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent("You are currently not logged in as an admin."));
	} else {
		db.Animal.findOne({
			where: {id: req.query.id}
		}).then( (animal) => {
			console.log (animal)
			res.render('adm-editanimal', {
				currentUser: user,
				currentAnimal: animal
				// goals: goals
			})

		})
	}
})



module.exports = router