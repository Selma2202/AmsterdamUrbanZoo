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
		db.Admin.findAll({
		}).then( (admins) => {
			console.log('Add admin page is now showing in the browser')
			res.render('adm-addadmin', {message: message, currentUser: user, allAdmins: admins})
		})
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

//change e-mail address
router.post('/adm-changeemail', (req, res) => {
	//In case frontend validation breaks, backend validation to make sure form is not empty
	if (req.body.newemail !== 0) {
		//Check to find out if the new email adress already exists in the database, assigned to a different user
		db.Admin.findOne({
			where: {
				email: req.body.newemail.toLowerCase()
			}
		}).then( (admin) => {
			//If it already exists, it can not be changed
			if(admin) {
				res.redirect('/adm-addadmin?message=' + encodeURIComponent('Sorry, an other admin already uses this e-mail address.'))
				return
				//Otherwise: change it!
			} else {
				db.Admin.findOne({
					where: {
						email: req.session.user.email
					}
				}).then( (admin) => {
					admin.updateAttributes({
						email: req.body.newemail.toLowerCase(),
					})
					req.session.user = admin
					res.redirect('/adm-addadmin?message=' + encodeURIComponent('Your email has been changed.'))
					return
				})
			}
		})
	}
})

//Update password
router.post('/adm-changepassword', (req, res) => {
	//In case front end validation breaks, make sure new password is at least 8 characters
	if(req.body.newpassword.length <= 7) {
		res.redirect('adm-addadmin?message=' + encodeURIComponent("Your password should be at least 8 characters long. Please try again."));
		return;
		//Then check whether user didn't make a typo in choosing a new password
	} else if(req.body.newpassword !== req.body.newpassword2) {
		res.redirect('adm-addadmin?message=' + encodeURIComponent("Your passwords did not match. Please try again."));
		return;
	} else {
		db.Admin.findOne({
			where: {
				id: req.session.user.id
			}
			//Since changing a password is a heavy change, first the old password is required. The old password needs to match the one in the database.
		}).then( (admin) => {
			bcrypt.compare(req.body.oldpassword, admin.password, (err, result) => {
				if(result) {
					//If the user succesfully passed all this validation, a new hashed password will be made.
					bcrypt.hash(req.body.newpassword, null, null, function(err, hash) {
						if (err) throw (err)
							admin.updateAttributes({
								password: hash,
							})
					})
					req.session.user	= admin
					res.redirect('/adm-addadmin?message=' + encodeURIComponent('Your password has been changed.'))
					return
				} else {
					res.redirect('/adm-addadmin?message=' + encodeURIComponent('Your old password is incorrect. Please try again.'))
					return
				}
			})
		})
	}
})

//// Export
module.exports = router