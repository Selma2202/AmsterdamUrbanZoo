'use strict'

let db = require(__dirname + '/../../modules/database')
const fs = require ("fs")

function fileParser (filename, callback){ 
  fs.readFile(filename, "utf8", function(err, data) {
    if (err) throw err;//error statement

    var parsedData = JSON.parse(data)
    callback(parsedData)
  })
}

fileParser( __dirname + '/../json/testdata_10stuks.json', function(data) {//only data in the callback-function, since this is the only thing returned by the other file

  for (var i = 0; i < data.length; i++) {

    console.log ( '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + 
      data[i].artist + ' ' + 
      data[i].title+ ' ' + 
      data[i].description+ ' ' + 
      data[i].dateSince+ ' ' + 
      data[i].material+ ' ' + 
      data[i].image+ ' ' + 
      data[i].lat+ ' ' + 
      data[i].lng
      )

    db.Art.create({
      artist: data[i].artist,
      title: data[i].title,
      description: data[i].description,
      dateSince: data[i].dateSince,
      material: data[i].material,
      image: data[i].image,
      lat: data[i].lat,
      lng: data[i].lng
    })
  }
})






// // include the node postgres library
// var pg = require('pg');
// var sequelize = require('sequelize')
// //connect to a database
// pg.connect('postgres://postgres:postgres@localhost/urbanzoo', function(err, client, done) {
//   //add a new artwork
//   client.query(`insert into arts 
//     (artist, title, description, dateSince, material, image, lat, lng, "createdAt", "updatedAt") 
//     values 
//     ('test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', '` + Date() +`', '` + Date() + `')`, function(err, result) {
//           //tried date.Now(), current_timestamp, dateonly(), now()
//     console.log(err)
//     // console.log(`${result.command}: ${result.rowCount}`);
//     //call done and end, same as the read example
//     done();
//     pg.end();
//   });
// });





//test
// var pg = require('pg');
// //connect to a database
// pg.connect('postgres://postgres:postgres@localhost/testing1', function(err, client, done) {
//   //add a new artwork
//   client.query(`insert into test 
//         (name, description) 
//         values 
//         ('ladida', 'joepdiedoe')`, function(err, result) {
//     //should print 'INSERT: 1'
//     console.log(err)
//     console.log(`${result.command}: ${result.rowCount}`);
//     //call done and end, same as the read example
//     done();
//     pg.end();
//   });
// });


//issue: de testversie werkt wel, maar de echte niet omdat hij ineens alles naar kleine letters omzet en zegt dat ie het niet kent.
//cd ..static/javascript node importer.js
// \c testing1
// select * from test