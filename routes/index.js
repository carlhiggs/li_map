'use strict';
const express = require('express'); // require Express
const router = express.Router(); // setup usage of the Express router engine

const jsdom = require('jsdom'); // jsdom to allow manipulation of html
const { JSDOM } = jsdom;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require("request");

router.use(cookieParser());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Setup connection
/* GET home page. */
//router.get('/', auth, function(req, res, next) {
router.get('/geonode', function(req, res, next) {
  res.render('index', { title: 'Pilot liveability Index' });
});

module.exports = router;

/** Geoserver proxying for dev/testing purposes --> this gets clobbered by nginx in production**/
router.all('/geoserver/*', function(req,res) {
  //modify the url in any way you want
  var base = 'http://localhost:8080/geoserver/';
  req.pipe(request({ qs:req.query, uri: base+req.params[0], method: req.method })).pipe(res);
});

/* ******************* TESTING *********************** */
/* GET Login response page (server side only)- for development purposes only */
router.get('/login_response', function(req, res) {
    res.render('login_response', {
      title: 'Login'
    });
});

/* POST Login response page to handle username & password
 NOTE:this is handled by geonode in production*/
router.post('/geonode/account/login', function(req, res) {
    res.cookie('csrftoken','THISISNOTACSRFTOKEN');
    res.cookie('sessionid','THISINOTASESSIONID');
    res.redirect('/li_map#observatory');
})

router.get('/people/profile/test/', function(req, res, next) {
  res.render('profile');
});
/* ************************************************************* */

/* GET the map page */
//router.get('/li_map', auth, function(req, res) {
router.get('/li_map', function(req, res) {
    // get csrf token value here and then insert into li_map.jade
    var csrf_html_value;
    var loggedin;
    var session_id = req.cookies['sessionid'];     // Session ID only available when logged in

    if (!session_id) {
      loggedin = 0; // User is unauthenticated
    } else {
      loggedin = 1; // User is authenticated
    }

    // Attempt to get csrftoken from cookie
    var csrf_token = req.cookies['csrftoken'];

    console.log('loggedin: ' + loggedin);
    console.log('sessionid: ' + session_id);
    console.log('csrf_token: ' + csrf_token);

    res.render('li_map', {
      title: "Pilot Urban Liveability Index",
      csrf_value: csrf_token,
      loginStatus: loggedin,
      sessionID: session_id
    });
});

router.get('/*', function(req, res) {
  // redirect any stray requests back to the authentication page
  res.redirect('/li_map#authenticate');
});
