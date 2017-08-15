var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine
// var template = require('jade').compileFile(__dirname + '/../views/index.jade')

 
/* PostgreSQL and PostGIS module and connection setup */
var pg = require("pg"); // require Postgres module

// Setup connection
// var username = "spatial@ligres" // sandbox username
// var password = "sp$nUggy" // read only privileges on our table
// var host = "ligres.postgres.database.azure.com:5432"
// var database = "ligres" // database name
// var ssl = "
// var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection
// var conString = spatial@ligres:sp$nUggy@ligres.postgres.database.azure.com:5432/ligres?ssl=true
var client = new pg.Client({
  user: "spatial@ligres",
  password: "sp$nUggy",
  database: "li_hard",
  port: 5432,
  host: "ligres.postgres.database.azure.com",
  ssl: true
});


// Set up your database query to display GeoJSON
var li_query = "SELECT * FROM li_map_json_hard";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pilot Liveability Index' });
  // try {
    // var html = template({ title: 'Pilot Liveability Index' })
    // res.render(html)
  // } catch (e) {
    // next(e)
  // }
});

module.exports = router;

// /* GET Postgres JSON data */
// router.get('/data', function (req, res) {
    // // var client = new pg.Client(conString);
    // client.connect();
    // var query = client.query(li_query);
    // query.on("row", function (row, result) {
        // result.addRow(row);
    // });
    // query.on("end", function (result) {
        // res.send(result.rows[0].row_to_json);
        // res.end();
    // });
// });

/* GET the map page */
router.get('/map', function(req, res) {
    // var client = new pg.Client(conString);
    client.connect();
    var query = client.query(li_query);
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        var data = result.rows[0].row_to_json
        res.render('map', {
            title: "Pilot Liveability Index",
            jsonData: data
        });
    });
});


