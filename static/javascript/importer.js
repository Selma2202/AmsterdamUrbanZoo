'use strict'

//let op dat de database op force:false staat. 
let db = require(__dirname + '/../../modules/database')
const fs = require ("fs")

//create a function that can parse a json file
function fileParser (filename, callback){ 
  fs.readFile(filename, "utf8", function(err, data) {
    if (err) throw err;//error statement

    var parsedData = JSON.parse(data)
    callback(parsedData)
  })
}

//deze twee importers nog scheiden, voor als ik maar één ding toe te voegen heb?
//import a json of artworks into the database (note: this adds, this does not replace)
setTimeout(function(){
  console.log('Starting Import')
  fileParser( __dirname + '/../json/testdata_10stuks.json', function(data) {
    console.log('Start Art import')
    for (var i = 0; i < data.length; i++) {
      db.Art.create({
        artist: data[i].artist,
        title: data[i].title,
        description: data[i].description,
        dateSince: data[i].dateSince,
        material: data[i].material,
        image: data[i].image,
        lat: data[i].lat,
        lng: data[i].lng,
        animal: data[i].animal
      })
    }
  })


  //import a json of animals into the database (note: this adds, this does not replace)
  fileParser( __dirname + '/../json/testdieren_bijde10stuks.json', function(data) {
    console.log('Start animal import')
    for (var i = 0; i < data.length; i++) {

      console.log(
        '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'+
        data[i].name + ' ' +
        data[i].class  + ' ARRAY: ' +
       data[i].rangeContinent)

      db.Animal.create({
        name: data[i].name,
        description: data[i].description,
        latinName: data[i].latinName,
        family: data[i].family,
        class: data[i].class,
        size: data[i].size,
        weight: data[i].weight,
        rangeContinent: String(data[i].rangeContinent),
        rangeCountry: String(data[i].rangeCountry)
      })
    }
  })
}, 5000)


//jaartal moet in een string
//vreemde tekens vervangen
//pakt hij enters in beschrijving?
