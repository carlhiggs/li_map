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
router.get('/', function(req, res, next) {
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
router.post('/account/login', function(req, res) {
    res.cookie('csrftoken','THISISNOTACSRFTOKEN');
    res.cookie('sessionid','THISINOTASESSIONID');
    res.redirect('/li_map#puli');
})

router.get('/people/profile/test', function(req, res, next) {
  res.render('profile');
});
/* ************************************************************* */

/* GET the map page */
//router.get('/li_map', auth, function(req, res) {
router.get('/li_map', function(req, res) {
    // get csrf token value here and then insert into li_map.jade
    // before it has loaded...
    // which will then post that value when user logs in to Geonode.
    var csrf_html_value;

    // // attempt 1 - get csrf token value from cookie
    // var csrf_cookie_value = req.cookies['csrftoken'];     // value from cookie
    //
    // // attempt 2 - get csrf token value from durin html
    // request("http://durin.australiasoutheast.cloudapp.azure.com/", async function(error, response, body) {
    //   var csrf_html_value=12345;
    //   var csrf_token; // this one for testing pulling one from the durin html
    //
    //   //We have to get the DOM asynchronously, otherwise getElementsByName often returns
    //   //an error as it the DOM has not yet loaded for it to parse.
    //   var x = await getbody(body);
    //
    //   function getbody(b){
    //    var dom = new JSDOM(b);
    //    return dom;
    //   };
    //
    //   var csrf_token = x.window.document.getElementsByName('csrfmiddlewaretoken')[0].value;
    //
    //   console.log("******************************????????????********************* ");
    //   console.log("csrf token value: ")
    //   console.log(csrf_token);
    //   console.log("******************************????????????********************* ");

      var csrf_token = req.cookies['csrftoken'];     // Collect csrf value from cookie
      var session_id = req.cookies['sessionid'];     // Session ID only available when logged in

      var loggedin;

      if (session_id == null) {
        // User is unauthenticated
        loggedin = 0;    //false
      } else {
        // User is authenticated
        loggedin = 1;    //true
      }

      res.render('li_map', {
        title: "Pilot Urban Liveability Index",
        csrf_value: csrf_token,
        loginStatus: loggedin,
        sessionID: session_id
      });
    //});
});

// /* GET the map page */
// router.get('/radar', auth, function(req, res) {
           // res.render('radar', {
             // title: "test_radar" //,
           // });
// });

router.get('/*', function(req, res) {
  // redirect any stray requests back to the authentication page
  res.redirect('/li_map#authenticate');
});
