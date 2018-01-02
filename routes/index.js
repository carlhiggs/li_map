'use strict';
const express = require('express'); // require Express
const basicAuth = require('basic-auth');
const router = express.Router(); // setup usage of the Express router engine
const pg = require('pg');  // PostgreSQL / PostGIS module

// Setup connection

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'gus' && user.pass === 'blahcheese') {
    return next();
  } else {
    return unauthorized(res);
  };
};


/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('index', { title: 'Pilot Liveability Index' });
});

module.exports = router;



/* GET the map page */
router.get('/li_map', auth, function(req, res) {
    res.render('li_map', {
      title: "Pilot Urban Liveability Index" //,
    });
});

// /* GET the map page */
// router.get('/radar', auth, function(req, res) {
           // res.render('radar', {
             // title: "test_radar" //,
           // });
// });
