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



router.get('/admin', function (req, res) {
	var user = req.session.user;
	var message = req.query.message;
	console.log('admin page is now showing in the browser')
	res.render('admin', {message: message, currentUser: user})
	//en dan in pug: als user is undefined, show loginscherm
	//als user is niet undefined (dus in sessie), show linkjes
});

router.post('/admin', function (req, res) {
	if(req.body.email === 0) {
		res.redirect('/login?message=' + encodeURIComponent('Please fill in your email.'))
		return
	}
	else if(req.body.password === 0) {
		res.redirect('/login?message=' + encodeURIComponent('Please fill in your password.'))
		return
	}
	else {
		db.Admin.findOne({
			where: {
				email: req.body.email.toLowerCase()
			}
		}).then( (admin) => {
			console.log(admin)
			if (admin) {
				bcrypt.compare(req.body.password, admin.password, (err, result) => {
					console.log(err)
					console.log(result)
					if(result) {
						req.session.user 		= admin
						console.log('succesfully logged in')
						res.redirect('/admin?message=' + encodeURIComponent('You are now logged-in as admin.'))
					} else {
						res.redirect('/admin?message=' + encodeURIComponent('Invalid email or password.'))
						return
					}
				})
			} else {
				res.redirect('/admin?message=' + encodeURIComponent('Invalid email or password.'))
				return
			}
		})
	}
})

//// Export
module.exports = router