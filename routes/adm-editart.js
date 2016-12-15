'use strict'
// Import standardized modules
const sequelize		= require('sequelize')
const express 		= require ('express')
const bodyParser 	= require('body-parser')
const bcrypt 		= require ('bcrypt-nodejs')
const session 		= require('express-session')
const router  		= express.Router ( )


let db = require(__dirname + '/../modules/database')

router.get('/adm-editart', (req, res) => {
	var user = req.session.user;
	// var id = req.query.id;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent("You are currently not logged in as an admin."));
	} else {
		db.Art.findOne({
			where: {id: req.query.id}
		}).then( (arts) => {
			console.log (arts)
			res.render('adm-editart', {
				currentUser: user,
				currentArt: arts
				// goals: goals
			})

		})
	}
})



module.exports = router