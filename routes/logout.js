'use strict'
//require the libraries.
const express 		= require ('express')
const sequelize 	= require ('sequelize')
const bodyParser 	= require ('body-parser')
const session		= require ('express-session')
const bcrypt		= require ('bcrypt-nodejs')
const router  		= express.Router ( )

let db = require(__dirname + '/../modules/database')

//The users logs out
router.get('/logout', (req, res) => {
	req.session.destroy( (err) => {
		if (err) console.log(err)
			res.redirect('/admin?message=' + encodeURIComponent('Admin succesfully logged out.'))
	})
})

module.exports = router