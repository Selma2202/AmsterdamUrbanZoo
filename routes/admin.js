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

// router.post('/xxx', function (req, res) {
// 	xxx
// })

//// Export
module.exports = router