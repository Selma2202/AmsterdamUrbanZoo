// //include the node postgres library
// var pg = require('pg');
// //connect to a database
// pg.connect('postgres://postgres:postgres@localhost/urbanzoo', function(err, client, done) {
//   //add a new artwork
//   client.query(`insert into arts 
//         (artist, title, description, dateSince, material, image, lat, lng) 
//         values 
//         ('` + artist + `', '` + title + `', '` + description + `', '` + dateSince + `', '` + material + `', '` + image + `', '` + lat + `', '` + lng + `')`, function(err, result) {
//     //should print 'INSERT: 1'
//     console.log(`${result.command}: ${result.rowCount}`);
//     //call done and end, same as the read example
//     done();
//     pg.end();
//   });
// });

//include the node postgres library
// var pg = require('pg');
// //connect to a database
// pg.connect('postgres://postgres:postgres@localhost/urbanzoo', function(err, client, done) {
//   //add a new artwork
//   client.query(`insert into arts 
//         (artist, title, description, dateSince, material, image, lat, lng, createdAt, updatedAt) 
//         values 
//         ('test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', '` + Date.now() +`', '` + Date.now() + `')`, function(err, result) {
//     //should print 'INSERT: 1'
//     console.log(err)
//     console.log(`${result.command}: ${result.rowCount}`);
//     //call done and end, same as the read example
//     done();
//     pg.end();
//   });
// });



//test
var pg = require('pg');
//connect to a database
pg.connect('postgres://postgres:postgres@localhost/testing1', function(err, client, done) {
  //add a new artwork
  client.query(`insert into test 
        (name, description) 
        values 
        ('ladida', 'joepdiedoe')`, function(err, result) {
    //should print 'INSERT: 1'
    console.log(err)
    console.log(`${result.command}: ${result.rowCount}`);
    //call done and end, same as the read example
    done();
    pg.end();
  });
});


//issue: de testversie werkt wel, maar de echte niet omdat hij ineens alles naar kleine letters omzet en zegt dat ie het niet kent.
//cd ..static/javascript node importer.js
// \c testing1
// select * from test