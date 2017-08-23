var express = require('express'); // require Express
var basicAuth = require('basic-auth');

var router = express.Router(); // setup usage of the Express router engine
// var template = require('jade').compileFile(__dirname + '/../views/index.jade')

 
/* PostgreSQL and PostGIS module and connection setup */
var pg = require("pg"); // require Postgres module

// Setup connection

var client = new pg.Client({
  user: "spatial@ligres",
  password: "sp$nUggy",
  database: "li_soft",
  port: 5432,
  host: "ligres.postgres.database.azure.com",
  ssl: true
});
// var client = new pg.Client({
  // user: "spatial",
  // password: "psq115842",
  // database: "li_vic",
  // port: 5432,
  // host: "localhost"
// });

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
var li_query_sa1 = "SELECT * FROM li_map_json_sa1_min_soft";
var li_query_ssc = "SELECT * FROM li_map_json_ssc_min_soft";
// var li_query = "SELECT * FROM li_map_json_sa1_min_hard";
// var li_query = "SELECT * FROM li_map_json_hard";
// var li_query = "SELECT * FROM li_map_json_h_mini";


/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('index', { title: 'Pilot Liveability Index' });
});

module.exports = router;

// /* GET Postgres JSON data */
// router.get('/data', function (req, res) {
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

// /* GET the sa1 map page */
// router.get('/map', auth, function(req, res) {
    // client.connect();
    // var query = client.query(li_query_sa1);
    // query.on("row", function (row, result) {
        // result.addRow(row);
    // });
    // query.on("end", function (result) {
        // var data = result.rows[0].row_to_json
        // res.render('map', {
            // title: "Pilot Liveability Index",
            // jsonData: data
        // });
    // });
// });

/* GET the ssc map page */
// router.get('/map_ssc', auth, function(req, res) {
    // client.connect();
    // var query = client.query(li_query_ssc);
    // query.on("row", function (row, result) {
        // result.addRow(row);
    // });
    // query.on("end", function (result) {
        // var data = result.rows[0].row_to_json
        // res.render('map_ssc', {
            // title: "Pilot Liveability Index",
            // jsonData: data
        // });
    // });
// });

// /* GET the sa1 map page */
// router.get('/map_sa1', auth, function(req, res) {
    // client.connect();
    // client.query(li_query_sa1)
      // .then(function (result) {
        // var sa1_data = result.rows[0].row_to_json
        // res.render('map_sa1', {
            // title: "Pilot Liveability Index",
            // jsonData: sa1_data
        // })
      // })
    // .catch(e => console.error(e.stack))
// });


/* GET the map page */
router.get('/li_map', auth, function(req, res) {
    client.connect();
    client.query(li_query_ssc)
      .then(function (result) {
        var sa1_data = result.rows[0].row_to_json
        var ssc_data = result.rows[0].row_to_json
        res.render('li_map', {
            title: "Pilot Liveability Index",
            json_sa1: sa1_data,
            json_ssc: ssc_data
        })
      })
    .catch(e => console.error(e.stack))
});


// Abandoned approach using pg-promise

// var express = require('express'); // require Express
// var basicAuth = require('basic-auth');

// var router = express.Router(); // setup usage of the Express router engine
// // var template = require('jade').compileFile(__dirname + '/../views/index.jade')

 
// /* PostgreSQL and PostGIS module and connection setup */
// // var pg = require("pg"); // require Postgres module
// const promise = require('bluebird'); // or any other Promise/A+ compatible library;
// const options = {
    // promiseLib: promise // overriding the default (ES6 Promise);
// };

// const pgp = require('pg-promise')(options);
// // Setup connection

// const cn = {
  // user: "spatial@ligres",
  // password: "sp$nUggy",
  // database: "li_soft",
  // port: 5432,
  // host: "ligres.postgres.database.azure.com",
  // ssl: true
// };
// // var client = new pg.Client({
  // // user: "spatial",
  // // password: "psq115842",
  // // database: "li_vic",
  // // port: 5432,
  // // host: "localhost"
// // });

// const db = pgp(cn); // database instance;

// var auth = function (req, res, next) {
  // function unauthorized(res) {
    // res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    // return res.send(401);
  // };

  // var user = basicAuth(req);

  // if (!user || !user.name || !user.pass) {
    // return unauthorized(res);
  // };

  // if (user.name === 'hlc' && user.pass === 'p7lo!') {
    // return next();
  // } else {
    // return unauthorized(res);
  // };
// };

// // Set up your database query to display GeoJSON
// var li_query_sa1 = "SELECT * FROM li_map_json_sa1_min_soft";
// var li_query_ssc = "SELECT * FROM li_map_json_ssc_min_soft";
// // var li_query = "SELECT * FROM li_map_json_sa1_min_hard";
// // var li_query = "SELECT * FROM li_map_json_hard";
// // var li_query = "SELECT * FROM li_map_json_h_mini";


// /* GET home page. */
// router.get('/', auth, function(req, res, next) {
  // res.render('index', { title: 'Pilot Liveability Index' });
// });

// module.exports = router;

// // /* GET Postgres JSON data */
// // router.get('/data', function (req, res) {
    // // client.connect();
    // // var query = client.query(li_query);
    // // query.on("row", function (row, result) {
        // // result.addRow(row);
    // // });
    // // query.on("end", function (result) {
        // // res.send(result.rows[0].row_to_json);
        // // res.end();
    // // });
// // });

// // /* GET the sa1 map page */
// // router.get('/map', auth, function(req, res) {
    // // client.connect();
    // // var query = client.query(li_query_sa1);
    // // query.on("row", function (row, result) {
        // // result.addRow(row);
    // // });
    // // query.on("end", function (result) {
        // // var data = result.rows[0].row_to_json
        // // res.render('map', {
            // // title: "Pilot Liveability Index",
            // // jsonData: data
        // // });
    // // });
// // });

// /* GET the ssc map page */
// // router.get('/map_ssc', auth, function(req, res) {
    // // client.connect();
    // // var query = client.query(li_query_ssc);
    // // query.on("row", function (row, result) {
        // // result.addRow(row);
    // // });
    // // query.on("end", function (result) {
        // // var data = result.rows[0].row_to_json
        // // res.render('map_ssc', {
            // // title: "Pilot Liveability Index",
            // // jsonData: data
        // // });
    // // });
// // });

// // /* GET the sa1 map page */
// // router.get('/map_sa1', auth, function(req, res) {
    // // client.connect();
    // // client.query(li_query_sa1)
      // // .then(function (result) {
        // // var sa1_data = result.rows[0].row_to_json
        // // res.render('map_sa1', {
            // // title: "Pilot Liveability Index",
            // // jsonData: sa1_data
        // // })
      // // })
    // // .catch(e => console.error(e.stack))
// // });


// /* GET the map page */
// router.get('/li_map', auth, function(req, res) {
    // db.task('get-everything', t => {
        // return t.batch([
            // t.any(li_query_ssc),
            // t.any(li_query_sa1)
        // ]);
    // })
    // .then(data => {
        // var ssc_data = data[0].rows[0].row_to_json;
        // var sa1_data = data[1].rows[0].row_to_json;
        // res.render('li_map', {
            // title: "Pilot Liveability Index",
            // json_ssc: ssc_data,
            // json_sa1: sa1_data
        // })
      // })
    // .catch(e => console.error(e.stack))
// });
