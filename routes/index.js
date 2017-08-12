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
  database: "ligres",
  port: 5432,
  host: "ligres.postgres.database.azure.com",
  ssl: true
});


// Set up your database query to display GeoJSON
var li_query = "SELECT row_to_json(fc) FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Transform(lg.geom,4326))::json As geometry, row_to_json((sa1_7dig11,suburb,lga,li_ci_est,walkability,si_mix,dest_pt,pos15000_access,pred_no2_2011_col_ppb,sa1_prop_affordablehousing,sa2_prop_live_work_sa3)) As properties FROM (SELECT t1.*,suburb,lga,t3.geom FROM li_deciles_hard_sa1_7dig11 AS t1 LEFT JOIN sa1_area AS t2 ON t1.sa1_7dig11 = t2.sa1_7dig11 LEFT JOIN sa1_2011_AUST AS t3 ON t1.sa1_7dig11 = t3.sa1_7dig11::integer) As lg) As f) As fc";


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


