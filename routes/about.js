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



router.get('/about', function (req, res) {
	var user = req.session.user;
	var message = req.query.message;
	console.log('about page is now showing in the browser')
	res.render('about', {currentUser: user})

});

//// Export
module.exports = router