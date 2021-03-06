'use strict'

//use only the ones that are needed

// Import standardized modules
const sequelize = require('sequelize')
const express = require ('express')
const bodyParser = require('body-parser')
const bcrypt = require ('bcrypt-nodejs')
const session = require('express-session');
const pg = require ('pg')

//initialize app
const app = express ( )

app.use(session({
	secret: 'this is a passphrase or something so ladieda',
	resave: false,
	saveUninitialized: false //"usefull with login option"
}));

app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + "/static"))

app.set ('view engine', 'pug')
app.set ('views', __dirname + '/views')

//// routes and modules
// require modules
let db = require ( __dirname + '/modules/database')

// require routes
let index = require (__dirname + '/routes/index')
let about = require ( __dirname + '/routes/about')
let submit = require ( __dirname + '/routes/submit')
let admin = require ( __dirname + '/routes/admin')
let addArt = require ( __dirname + '/routes/adm-addart')
let listArt = require ( __dirname + '/routes/adm-listart')
let editArt = require ( __dirname + '/routes/adm-editart')
let addAnimal = require ( __dirname + '/routes/adm-addanimal')
let listAnimal = require ( __dirname + '/routes/adm-listanimal')
let editAnimal = require ( __dirname + '/routes/adm-editanimal')
let addAdmin = require ( __dirname + '/routes/adm-addadmin')

let logout = require ( __dirname + '/routes/logout')

// use
app.use ( '/', index)
app.use ( '/', about)
app.use ( '/', submit)
app.use ( '/', admin)
app.use ( '/', addArt)
app.use ( '/', listArt)
app.use ( '/', editArt)
app.use ( '/', addAnimal)
app.use ( '/', listAnimal)
app.use ( '/', editAnimal)
app.use ( '/', addAdmin)

app.use ( '/', logout)


//// For debugging purposes
app.get ('/ping', (req, res) => {
	res.send ('pong')
})

app.listen (8000, ( ) => {
	console.log ('The server is listening on local host 8000')
} )
