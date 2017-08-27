'use strict';
const express = require('express'); // require Express
const basicAuth = require('basic-auth');
const router = express.Router(); // setup usage of the Express router engine
const pg = require('pg');  // PostgreSQL / PostGIS module 

// Setup connection
const client = new pg.Client({
  user: "spatial@ligres",
  password: "sp$nUggy",
  database: "li_soft",
  port: 5432,
  host: "ligres.postgres.database.azure.com",
  ssl: true
});

client.connect();

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'hlc' && user.pass === 'p7lo!') {
    return next();
  } else {
    return unauthorized(res);
  };
};

// Set up your database query to display GeoJSON
const li_query_sa1 = "SELECT * FROM li_map_json_sa1_min_soft";
const li_query_ssc = "SELECT * FROM li_map_json_ssc_min_soft";
// var li_query = "SELECT * FROM li_map_json_sa1_min_hard";
// var li_query = "SELECT * FROM li_map_json_hard";
// var li_query = "SELECT * FROM li_map_json_h_mini";


/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('index', { title: 'Pilot Liveability Index' });
});

module.exports = router;



/* GET the map page */
router.get('/li_map', auth, function(req, res) {
    client.query(li_query_ssc)
      .then(data => {
        var ssc_data = data.rows[0].row_to_json
        client.query(li_query_sa1)
          .then(data => {
           var sa1_data = data.rows[0].row_to_json
           res.render('li_map', {
             title: "Pilot Liveability Index",
             json_sa1: sa1_data,
             json_ssc: ssc_data
           })
        })
      })
    .catch(e => console.error(e.stack))
});

