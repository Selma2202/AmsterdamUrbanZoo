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



router.get('/adm-addadmin', function (req, res) {
	var user = req.session.user;
	var message = req.query.message;
	if (user === undefined) {
		res.redirect('admin?message=' + encodeURIComponent('You are currently not logged in as an admin.'))
	} else {
		console.log('Add admin page is now showing in the browser')
		res.render('adm-addadmin', {message: message, currentUser: user})
	}
});

router.post('/adm-addadmin', function (req, res) {
	if(req.body.email === 0) {
		res.redirect('/adm-addadmin?message=' + encodeURIComponent('Please fill in your email.'))
		return
	} else if(req.body.password.length < 7 ) {
		res.redirect('/adm-addadmin?message=' + encodeURIComponent('Your password should be longer than 6 characters.'))
		return
	} else if (req.body.password !== req.body.password2 ) {
		res.redirect('/adm-addadmin?message=' + encodeURIComponent('Your passwords do not match. Please try again.'))
		return
	} else {
		db.Admin.findOne({
			where: {
				email: req.body.email.toLowerCase()
			}
		}).then ( (admin) => {
			if(admin) {
				res.redirect('/adm-addadmin?message=' + encodeURIComponent('This e-mail address is already assigned to an admin.'))
				return
			} else {
				bcrypt.hash(req.body.password, null, null, function(err, hash) {
					db.Admin.create({
						email: req.body.email.toLowerCase(),
						password: hash
					}).then(function () {
						db.conn.sync().then( () => {
							console.log('Admin added')
							res.redirect('/adm-addadmin?message=' + encodeURIComponent("The admin has been added."))
						})
					})
				})
			}
		})
	}
})

//// Export
module.exports = router