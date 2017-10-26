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

/* GET the Cardinia front page */
router.get('/Cardinia', auth_cardinia, function(req, res, next) {
  res.render('Cardinia', { title: "Pilot Liveability Index: Shire of Cardinia, Melbourne 2011" });
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

