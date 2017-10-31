'use strict';
const express = require('express'); // require Express
const basicAuth = require('basic-auth');
const router = express.Router(); // setup usage of the Express router engine
const pg = require('pg');  // PostgreSQL / PostGIS module 
const gjfilter = require('feature-filter-geojson');
const get_cardinia = ["==", "f3", "Cardinia (S)"];
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

// Define authorisation keys --- use distinct, and not predictable keys for different LGAs 
// --- try to include a random component so the pattern isn't the same for each 
//  e.g. #### + first four letters of name backwards + year of relevance
// so 2710mirb2011 for Brimbank; the intent of "2710" is that it makes it more difficult for others to guess password if not known
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

var auth_brimbank = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'Brimbank' && user.pass === '2710mirb2011') {
    return next();
  } else {
    return unauthorized(res);
  };
};

var auth_cardinia = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'Cardinia' && user.pass === 'soc2011') {
    return next();
  } else {
    return unauthorized(res);
  };
};

// Set up your database query to display GeoJSON
const li_query_sa1 = "SELECT * FROM clean_li_map_json_sa1_min_soft";
const li_query_ssc = "SELECT * FROM clean_li_map_json_ssc_min_soft";

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

/* Utility functions for filtering
sourced from
http://www.paulfree.com/11/javascript-lambda-expressions/
http://www.paulfree.com/28/javascript-array-filtering/#more-28
*/
/* lambda utility function  */
function lambda( l )
{
   var fn = l.match(/\((.*)\)\s*=>\s*(.*)/) ;
   var p = [] ;
   var b = "" ;
 
   if ( fn.length > 0 ) fn.shift() ;
   if ( fn.length > 0 ) b = fn.pop() ;
   if ( fn.length > 0 ) p = fn.pop()
    .replace(/^\s*|\s(?=\s)|\s*$|,/g, '').split(' ') ;
 
   // prepend a return if not already there.
   fn = ( ( ! /\s*return\s+/.test( b ) ) ? "return " : "" ) + b ;   
 
   p.push( fn ) ;
 
   try
   {
      return Function.apply( {}, p ) ;
   }
   catch(e)
   {
        return null ;
   }
}
/* filter function */
Array.prototype.where =
   function(f)
   {
      var fn = f ;
      // if type of parameter is string
      if ( typeof f == "string" )
         // try to make it into a function
         if ( ( fn = lambda( fn ) ) == null )
            // if fail, throw exception
            throw "Syntax error in lambda string: " + f ;
      // initialize result array
      var res = [] ;
      var l = this.length;
      // set up parameters for filter function call
      var p = [ 0, 0, res ] ;
      // append any pass-through parameters to parameter array
      for (var i = 1; i < arguments.length; i++) p.push( arguments[i] );
      // for each array element, pass to filter function
      for (var i = 0; i < l ; i++)
      {
         // skip missing elements
         if ( typeof this[ i ] == "undefined" ) continue ;
         // param1 = array element
         p[ 0 ] = this[ i ] ;
         // param2 = current indeex
         p[ 1 ] = i ;
         // call filter function. if return true, copy element to results
         if ( !! fn.apply(this, p)  ) res.push(this[i]);
      }
      // return filtered result
      return res ;
   }

   
// Define web content
// In future should devise a loop to create unique content for each LGA, with a pre-created list of LGA-specific password keys
// In the mean time, make sure to:
//  - update LGA name and title (e.g. 'City of Brimbank') on this page, front page and map page
//  - update lga_name11 variable value (e.g. 'Brimbank (C)')   
//  - update site links (e.g. 'li_brimbank' on brimbank front page)
//  - Remember to center map page on point relevant to map (e.g. Melbourne, or a particular LGA) 
//     - set manually and check parameter using: map.getCenter();  then place this parameter in map script
//  - Set zoom as appropriate for map focus (e.g. city, or LGA) 
//     - set manually and check parameter using: map.getZoom();  then place this parameter in map script
   
/* GET the Brimbank front page */
router.get('/Brimbank', auth_brimbank, function(req, res, next) {
  res.render('Brimbank', { title: "Pilot Liveability Index: City of Brimbank, Melbourne 2011" });
});   
   
/* GET the Cardinia front page */
router.get('/Cardinia', auth_cardinia, function(req, res, next) {
  res.render('Cardinia', { title: "Pilot Liveability Index: Shire of Cardinia, Melbourne 2011" });
});

/* GET the Brimbank map page */
router.get('/li_brimbank', auth_brimbank, function(req, res) {
    client.query(li_query_ssc)
      .then(data => {
        var ssc_data = data.rows[0].row_to_json.features.where( "( el, i, res, param ) => el.properties.f3 == param", "Brimbank (C)" );
        client.query(li_query_sa1)
          .then(data => {
           var sa1_data =  data.rows[0].row_to_json.features.where( "( el, i, res, param ) => el.properties.f3 == param", "Brimbank (C)" );
           res.render('li_brimbank', {
             title: "Pilot Liveability Index: City of Brimbank, Melbourne 2011",
             json_sa1: sa1_data,
             json_ssc: ssc_data
           })
        })
      })
    .catch(e => console.error(e.stack))
});
   
/* GET the Cardinia map page */
router.get('/li_cardinia', auth_cardinia, function(req, res) {
    client.query(li_query_ssc)
      .then(data => {
        var ssc_data = data.rows[0].row_to_json.features.where( "( el, i, res, param ) => el.properties.f3 == param", "Cardinia (S)" );
        client.query(li_query_sa1)
          .then(data => {
           var sa1_data =  data.rows[0].row_to_json.features.where( "( el, i, res, param ) => el.properties.f3 == param", "Cardinia (S)" );
           res.render('li_cardinia', {
             title: "Pilot Liveability Index: Shire of Cardinia, Melbourne 2011",
             json_sa1: sa1_data,
             json_ssc: ssc_data
           })
        })
      })
    .catch(e => console.error(e.stack))
});

