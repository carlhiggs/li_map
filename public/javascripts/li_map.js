function init_map() {
    map = L.map('map', {
          center: [-27.1960144, 133.8354492],
          zoom: 5,
          minZoom: 2,
          maxZoom: 18,
    });

    // Define basemaps
    bmap_satellite = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    bmap_satellite_attrib = '&copy; <a href="http://www.esri.com/" title="Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community">Esri</a>';
    bmap_osm_mono = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
    bmap_osm_mono_attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';
    bmap_osm_colour = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    bmap_osmcolour_attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

    // add attribution
    map.attributionControl.addAttribution('Liveability Index &copy; <a href="http://cur.org.au/research-programs/healthy-liveable-cities-group/">Healthy Liveable Cities Group, RMIT</a>'+' | '+bmap_osm_mono_attrib+' | '+bmap_satellite_attrib);

    // create underlay basemaps pane; to be kept underneath otherlayers
    map.createPane('underlay');
    map.getPane('underlay').style.zIndex = 0;
    map.getPane('underlay').style.pointerEvents = 'none';
        // Add tiles, mini-map, scale bar and legend to map
    var bmap2,
        miniMap,
        legend;

    // add mini-map
    bmap2 = new L.TileLayer(bmap_osm_mono, {
        minZoom: 0,
        maxZoom: 13,
        attribution: bmap_osm_mono_attrib
    });

    miniMap = new L.Control.MiniMap(bmap2, {
        position: 'bottomleft'
    }).addTo(map);

    // add scale bar
    L.control.scale().addTo(map);



    // Colour based on percentile


    // // function to scale a percentile to a quantile (e.g. for quintile, num = 20) -- NOT USED
    // function requantile(p, num) {
      // return Math.floor((p - 1) / num) + 1;
    // }

    // // Style and add legend
    // legend = L.control({
        // position: 'bottomright'
    // });

    // legend.onAdd = function(map) {
        // var div = L.DomUtil.create('div', 'info legend'),
        // quantiles = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
        // labels = [],
        // quantile = ['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;'];
      // labels.push('<table style="table-layout:fixed; line-height: 15px;" ><col width="20"><tr><td>High</td></tr>');
      // for (var i = 0; i < quantiles.length; i++) {
        // labels.push('<tr><td style="background:' + getColor(quantiles[i]) + '">' + quantile[i] + '</td>');
      // }
      // div.innerHTML = labels.join('</tr>') + '</tr><tr><td>Low</td></tr></table>';
      // return div;
    // };

    // legend.addTo(map);

    // Construct layer control
    basemaps = L.control.panelLayers(
    [
        {
            group: "Base layer",
            collapsed: true,
            layers:[
                   {
                       "name": "Off",
                       "layer": L.tileLayer('')
                   }
                   ]
        }
    ],[],{compact: true}
    ).addTo(map);

    overlays = L.control.panelLayers(
    [
          {
            group: "Summary scale",
            collapsed: true,
            layers:[
                   {
                       "name": "Off",
                       "layer": L.tileLayer('')
                   }
                   ]
        }
    ],[],{compact: true}
    ).addTo(map);

    //  Ensure that active boundary lines are foregrounded when overlay changes
    overlays._form.onchange = function() {
      boundaries._layers.forEach(function (obj) {
        if (obj.name!="Off" && obj.layer._map!=null){
          obj.layer.bringToFront();
        }
      });
    };

    boundaries = L.control.panelLayers(
    [
          {
            group: "Boundary lines",
            collapsed: true,
            layers: [{
                       "name": "Off",
                       "layer": L.tileLayer('').addTo(map)
                   }]
        }
    ],[],{compact: true}
    ).addTo(map);



    // add base map layers to layer control
    basemaps.addBaseLayer({
        group: "Base layer",
        collapsed: true,
	       name:  'Satellite',
	      layer: L.tileLayer(bmap_satellite).addTo(map),
          pane: 'underlay',
        });

    basemaps.addBaseLayer({
        group: "Base layer",
        collapsed: true,
		    name:  'OSM (simple)',
	      layer: L.tileLayer(bmap_osm_mono),
          pane: 'underlay',
        });


    basemaps.addBaseLayer({
        group: "Base layer",
        collapsed: true,
		    name:  'OSM (detail)',
	      layer: L.tileLayer(bmap_osm_colour),
          pane: 'underlay',
        });
    // // add full screen toggle
    // // NOT CURRENTLY WORKING WITH INDICATOR DROP MENU
    // map.addControl(new L.Control.Fullscreen());


    // // add save to .png functions
    // var printer = L.easyPrint({
      // title: 'Download snapshot to png (ctr+alt+s): **this may take some time to process!!**',
      // tileLayer: basic_tiles,
      // filename: 'LiveabilityIndexExport',
      // exportOnly: true,
      // hideControlContainer: false
    // }).addTo(map);
};

// define colour schemes
coloursets = {
        'pgrn': ['#276419','#4d9221','#7fbc41','#b8e186','#e6f5d0','#fde0ef','#f1b6da','#de77ae','#c51b7d','#8e0152','#f7f7f7'],
        'BrBG':['#003c30','#01665e','#35978f','#80cdc1','#c7eae5','#f5f5f5','#f6e8c3','#dfc27d','#bf812d','#8c510a','#543005'],
        'RdYlBu':['#313695','#4575b4','#74add1','#abd9e9','#e0f3f8','#ffffbf','#fee090','#fdae61','#f46d43','#d73027','#a50026']
    };


// initialise colourscheme
colourscheme = 'RdYlBu'

function getColor(p) {
      // Decile colours
      // pgrn colour scheme - diverging
        return p > 90 ? coloursets[colourscheme][0]:
               p > 80 ? coloursets[colourscheme][1]:
               p > 70 ? coloursets[colourscheme][2]:
               p > 60 ? coloursets[colourscheme][3]:
               p > 50 ? coloursets[colourscheme][4]:
               p > 40 ? coloursets[colourscheme][5]:
               p > 30 ? coloursets[colourscheme][6]:
               p > 20 ? coloursets[colourscheme][7]:
               p > 10 ? coloursets[colourscheme][8]:
               p >= 0 ? coloursets[colourscheme][9]:
                        '#00FFFFFF';
    };

function purge_panelLayer(panel) {
      for (i = 0; i < panel._layers.length; i++) {
        panel.clearLayers();
      }
      map.removeControl(panel)
};

// update drop menu with indicator items
// Following https://stackoverflow.com/questions/22266171/javascript-html-select-add-optgroup-and-option-dynamically
function add_optgr(sel, lab, opts) {
    var i,
        len = opts.length, opt,
        gr = document.createElement('OPTGROUP');

    gr.label = lab;
    for (i = 0; i < len; ++i) {
        opt = document.createElement('OPTION');
        opt.textContent = opts[i].name;
        // Here you most likely also want to set .value
        opt.value = opts[i].value;
        gr.appendChild(opt);
    }
    sel.appendChild(gr);
    return gr;
}

/* Build the select.
 * @wrap: Container where to add finished product.
 * @size: Size attribute for select.
 * @opt : Options object.
 * * * * * * * * * * * * * * * * * * * * * * * * * */
function build_select(wrap, size, opt) {
    var sel = document.createElement('SELECT'),
        prop;
    size = size || 1;
    sel.id = 'inddrop';
    for (prop in opt)
        if (opt.hasOwnProperty(prop))
            add_optgr(sel, prop, opt[prop]);
    wrap.appendChild(sel);
};

// make info divs for indicators, containing metadata
function add_ind_info(ind, short_desc, long_desc, datasources, policy) {
    // remove div with id of ind if already exists
    if (document.contains(document.getElementById(ind))===false) {
      // create new div
      var sel = document.createElement('div'),
          prop;
      sel.id = ind;
      $(sel).attr('class','overlay')
      sel.innerHTML = '<div class="popup"><h2>'+short_desc+'</h2><a href="#" class="close">&times;</a><div class = "content">'+long_desc+'.<br><br><b>Data sources</b>: '+datasources+'<br><br><b>Policy</b>: '+policy+'.</div></div>';
      document.body.appendChild(sel);
    }
};




// parse json descriptions into a look up table, and also populate info divs
function json2desc(data) {
    var  options, domain_lookup, ind_desc, domain, prev_domain, ind_array;
    options = {};
    domain_lookup = {'walk': 'Walkability',
                     'trans': 'Transport',
                     'pos': 'Public Open Space',
                     'hous': 'Housing',
                     'food': 'Food',
                     'alc': 'Alcohol'
                     };
    prev_domain = "";
    ind_array = [];
    for (i=0; i < data.features.length; i++) {
      ind = data.features[i].properties["indicators"];
      short_desc = data.features[i].properties["short_desc"];
      long_desc = data.features[i].properties["description"];
      datasources = (typeof data.features[i].properties["datasources"]!=='undefined') ? data.features[i].properties["datasources"] : '<i>To be added!</i>';
      policy = data.features[i].properties["Policy"];
      tags = ind.split('_')
      domain = domain_lookup[tags[0]]
      add_ind_info(ind, short_desc, long_desc, datasources, policy)
      if ((prev_domain != domain)&&(prev_domain=="")) {
          newvar = {};
          newvar['name'] = short_desc;
          newvar['value'] = ind;
          ind_array.push(newvar);
      };
      if ((prev_domain != domain)&&(prev_domain!="")) {
          options[prev_domain] = ind_array;
          ind_array = [];
          newvar = {};
          newvar['name'] = short_desc;
          newvar['value'] = ind;
          ind_array.push(newvar);
      };
      if (prev_domain == domain) {
          newvar = {};
          newvar['name']  = short_desc;
          newvar['value'] = ind;
          ind_array.push(newvar);
      }
      // ind_desc.push([data.features[1].properties["indicators"],data.features[1].properties["Description"]]);
      prev_domain = domain;
    };
    return(options)
};

function get_nested_array_length(data) {
    var nrows = 0;
    for (i = 0; i < Object.keys(data).length; i++) {
        nrows += data[Object.keys(data)[i]].length
        console.log(nrows)
    }
    return nrows;
};


function load_li_map(locale,year) {
    purge_panelLayer(overlays)
    purge_panelLayer(boundaries)

    // Construct layer control
    overlays = L.control.panelLayers(
    [
          {
            group: "Summary scale",
            collapsed: true,
            layers:[
                   {
                       "name": "Off",
                       "layer": L.tileLayer('')
                   }
                   ]
        }
    ],[],{compact: true}
    ).addTo(map);

    //  Ensure that active boundary lines are foregrounded when overlay changes
    overlays._form.onchange = function() {
      boundaries._layers.forEach(function (obj) {
        if (obj.name!="Off" && obj.layer._map!=null){
          obj.layer.bringToFront();
        }
      });
    };

    boundaries = L.control.panelLayers(
    [
          {
            group: "Boundary lines",
            collapsed: true,
            layers: [{
                       "name": "Off",
                       "layer": L.tileLayer('').addTo(map)
                   }]
        }
    ],[],{compact: true}
    ).addTo(map);

    // var leadType = Cookies.get('csrftoken');
    // var target = document.getElementsByName('csrfmiddlewaretoken')[ 0 ];
    //
    // target.value = leadType;
    // console.log(target.value);
    // console.log(leadType);
    // console.log(target.value);
    // console.log(leadType);

    var csrf_value = document.getElementsByName("csrfmiddlewaretoken")[0].value;

    if (!csrf_value) {
      // User has either never logged in before, or has cleared cookies
      // Raid GeoNode home page for csrf value

      $.ajax({
        type: "GET",
        url: "/account/signup/",
        dataType: "html",
        success: function(data) {
          var re = /csrfmiddlewaretoken' value='\w*\b/;
          var search = re.exec(data);
          var csrf_blob = search[0];
          csrf_value = csrf_blob.split("='")[1];
          document.getElementsByName("csrfmiddlewaretoken")[0].value = csrf_value;
          document.getElementsByName("csrfmiddlewaretoken")[1].value = csrf_value;
        },
        error: function(data) {
          console.log("No CSRF value could be found");
        }
      });
    };

    // Get token from GeoNode for access to geoserver
    // Load profile page and pilfer access token from link to user layers document
    var selected_locale = document.getElementById("city");
    var proper_locale = selected_locale.options[selected_locale.selectedIndex].innerHTML.replace('&nbsp;','');
    var sa1, ssc, lga, ssc_search;
    // Submit form from here rather than in li_map.jade
    var username, access_token_url, token_href, access_token;
    var profile_page_url, status, loggedin_status, session_id;

    var ind_description, li_sa1_url, li_ssc_url, li_lga_url, vic_ugb;

    // For test purposes we define the locale and year here
    // Later, we will have these selectable from respect lists; perhaps with start default

    var region = "australia"
    var init_ind = "walk_12"
    status = document.getElementById("status");
    loggedin_status = status.getAttribute("data-status");
    session_id = status.getAttribute("data-session");

    city_coords = {
        'init'    : [-27.1960144, 133.8354492],
        'adelaide': [-34.9686870, 138.7353515],
        'bris'    : [-27.4491810, 153.2270050],
        'canberra': [-35.3249297, 149.1387177],
        'darwin'  : [-12.4642346, 130.9731674],
        'hobart'  : [-42.8777253, 147.3462296],
        'melb'    : [-37.9176594, 145.0621033],
        'perth'   : [-32.1343386, 116.0300445],
        'syd'     : [-33.7603111, 150.9919739]
    }

    city_zoom = {
        'init'    : 5,
        'adelaide': 10,
        'bris'    : 10,
        'canberra': 11,
        'darwin'  : 12,
        'hobart'  : 11,
        'melb'    : 10,
        'perth'   : 10,
        'syd'     : 10
    }

    region_to_locale = {
        'Australian Capital Territory':'canberra',
        'Greater Adelaide'            :'adelaide',
        'Greater Brisbane'            :'bris'    ,
        'Greater Darwin'              :'darwin'  ,
        'Greater Hobart'              :'hobart'  ,
        'Greater Melbourne'           :'melb'    ,
        'Greater Perth'               :'perth'   ,
        'Greater Sydney'              :'syd'
    }

    locale_to_region = {
        'init'    : 'init',
        'canberra': 'Australian Capital Territory',
        'adelaide': 'Greater Adelaide'            ,
        'bris'    : 'Greater Brisbane'            ,
        'darwin'  : 'Greater Darwin'              ,
        'hobart'  : 'Greater Hobart'              ,
        'melb'    : 'Greater Melbourne'           ,
        'perth'   : 'Greater Perth'               ,
        'syd'     : 'Greater Sydney'
    }

    if(loggedin_status == 1) {
      // Logged in - get access token from GeoNode

      // window.location.hash = "observatory";

      $.ajax({
        type: "GET",
        url: "/geonode/",
        dataType: "text",
        success: function(data) {
          // get profile page url
          var re = /"\/people\/profile\/\w*\b/;
          var search = re.exec(data);
          var profile_page_url_blob = search[0];
          profile_page_url = profile_page_url_blob.split('"')[1];

          $.ajax({
            type:"GET",
            url: profile_page_url,
            dataType: "html",
            success: function(data) {
              // Get access token
              re = /\?access_token=[^"]*/;
              search = re.exec(data);
              var access_token_blob = search[0];
              access_token = access_token_blob.split("=")[1];

              // Access to default public group
              var re_dg = /\/groups\/group\/default\//;
              var defaultGroup = re_dg.exec(data);

              if (!defaultGroup) {
                // Join up to default public group
                $.ajax({
                  type: "POST",
                  url: "/groups/group/default/join/",
                  data: {csrfmiddlewaretoken : csrf_value},
                  error: function(data) {
                    console.log("User was not enrolled in default group");
                  },
                  complete: function(data) {
                    // Attempt access regardless of default group status;
                    geoserverDataRequest();
                  }
                })
              } else {
                // Already in default group - load public data
                geoserverDataRequest();
              };
            },
            error: function(data) {
              console.log("Access token could not be found");
            }
          });

        },
        error: function(data) {
          console.log("Failure to access profile page");
        }
      });
    } else {
      // Not logged in - display authentication page
      window.location.hash = "authenticate";
      window.reload(true);
    };

    function geoserverDataRequest() {
        // load data from GeoServer through multiple ajax calls
        // WFS data
        // li_region_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_"+region+"_"+year+"&CQL_FILTER=gccsa_name%20is%20not%20"+locale_to_region[locale]+"&outputFormat=text%2Fjavascript";
        li_region_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_"+region+"_"+year+"&outputFormat=text%2Fjavascript";
        ind_description = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:ind_description_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
        li_sa1_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_sa1_"+locale+"_"+year+"&CQL_FILTER=r_walk_12 is not null&outputFormat=text%2Fjavascript";
        li_ssc_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_ssc_"+locale+"_"+year+"&CQL_FILTER=r_walk_12 is not null&outputFormat=text%2Fjavascript";
        li_lga_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_lga_"+locale+"_"+year+"&CQL_FILTER=r_walk_12 is not null&outputFormat=text%2Fjavascript";
        // Load additional supplementary layers
        boundaries_ssc_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:boundaries_ssc_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
        boundaries_lga_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:boundaries_lga_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
        // urban_sos_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:urban_sos_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
        allAjaxCalls();
    };


//    var login = document.getElementById('login_form');
//    login.addEventListener("submit", function(e) {
//      e.preventDefault();
//      submitForm(login);
//      return false;
//    }, capture);

//    var register = document.getElementById('signup_form');
//    register.addEventListener("submit", function(e) {
//      e.preventDefault();
//      submitForm(register);
//      return false;
//    }, capture);


//    function submitForm(form) {
//      // Pull url and action directly from form
//      $.ajax({
//        type: form.attr('method'),
//        url: form.attr('action'),
//        contentType: "text/plain",
//        data: form.FormData(),
//        complete: function(xhr, textStatus) {
//          // Can't do anything here due to GeoNode redirect!!!!!
//        }
//      });
//    };

    window.parseResponse_inds = function(data) {
        // reformat json array to reqd format
        ind_desc = data;
        opt = json2desc(data);
        $(function(){
             var $select = $('#inddrop');
             $select.empty(); // remove old options
             $.each(opt, function(key, value){
                 var group = $('<optgroup label="' + key + '" />');
                 $.each(value, function(){
                     $('<option />').html(this.name).appendTo(group)
                       .attr("value",this.value);
                 });
                 group.appendTo($select);
             });
        });
    };

    map.setView(city_coords[locale],city_zoom[locale])

    $('#logo').change(function() {
        if ($(this).val()=== 'refreshCountry'){
          load_li_map('init',2016);
          $(".leaflet-control-search").remove()
          $('#city').val('init');
        }
        if ($(this).val()=== 'refreshCity') {
          thislocale = $('#city').val()
          map.setView(city_coords[thislocale],city_zoom[thislocale])
        }
        $('#logo').val('');
      });

    // column graph indicator scale function
    function bgWidth(value){
      return (value/100)*230 +'px'
    }

    // Indicator selection menu: restyle map and present summary overlay
    function UpdateIndicatorList() {
      var selected_ind = document.getElementById("inddrop");
      var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
      var tags  = ind_value.split('_')
      var threshold = ', soft threshold';
      var threshold2 = 'soft thresholding';
      var thresh_code = '_soft'
      if (tags.indexOf('hard') > -1) {
        threshold  = ', hard threshold';
        threshold2 = 'hard thresholding';
        thresh_code = '_hard';
      }
      // if (tags.indexOf('soft') > -1) {
        // threshold  = ', soft threshold';
        // threshold2 = 'soft threshold';
        // thresh_code = '_soft';
      // }
      var layer_description = "Residential lots: "+ind_desc.features.find(x => x.properties.indicators === ind_value).properties.short_desc;
      var ind_units = ind_desc.features.find(x => x.properties.indicators === ind_value).properties.units
       if (sa1) {
         sa1.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties['p_'+ind_value]),
               fillOpacity: 0.7,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties['sa1'] +'<br>Suburb: ' + layer.feature.properties['suburb'] +'<br>LGA: ' + layer.feature.properties['lga'] + '<br><br><b>'+ layer_description +'</b><br>Average: '+  layer.feature.properties['r_'+ind_value]+' '+ind_units+'<br>Range: '+  layer.feature.properties['d_'+ind_value]+' '+ind_units+'<br>25th to 75th percentile (usual range): '+  layer.feature.properties['m_'+ind_value]+' '+ind_units);
           layer.setPopupContent('<table class="g-pop-table" width="450" height="300">'+
                       '<col width="0"><col width="290"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + layer.feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + layer.feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + layer.feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator summary *</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in this city:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_17'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_17'+thresh_code+'">Walkability index score (0 is average)</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_17'+thresh_code] +'</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_17'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_14'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_14'+thresh_code+'">Daily living score</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_14'+thresh_code]+' / 3</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_14'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_16">Dwelling density, gross</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_16']+' / Ha</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_15">Street connectivity</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_15']+' / km<sup>2</sup></td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_12">Distance to closest activity centre</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_12']+' km</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'trans_6'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#trans_6'+thresh_code+'">Regular serviced public transport within 400 m</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'trans_6'+thresh_code]+' %</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'trans_6'+thresh_code]+'</td></tr>'+
                       '<tr><td></td><td><small>*<a href="#destination_access">Destination accessibility</a> calculated using '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2016/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2016 Census QuickStats</a>',           {
             maxWidth: 400
           });
         });
       };


       if (ssc) {
         ssc.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties['p_'+ind_value]),
               fillOpacity: 0.7,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties['sa1'] +'<br>Suburb: ' + layer.feature.properties['suburb'] +'<br>LGA: ' + layer.feature.properties['lga'] + '<br><br><b>'+ layer_description +'</b><br>Average: '+  layer.feature.properties['r_'+ind_value]+' '+ind_units+'<br>Range: '+  layer.feature.properties['d_'+ind_value]+' '+ind_units+'<br>25th to 75th percentile (usual range): '+  layer.feature.properties['m_'+ind_value]+' '+ind_units);
           layer.setPopupContent('<table class="g-pop-table" width="450" height="300">'+
                       '<col width="0"><col width="290"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + layer.feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + layer.feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + layer.feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator summary *</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in this city:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_17'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_17'+thresh_code+'">Walkability index score (0 is average)</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_17'+thresh_code] +'</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_17'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_14'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_14'+thresh_code+'">Daily living score</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_14'+thresh_code]+' / 3</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_14'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_16">Dwelling density, gross</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_16']+' / Ha</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_15">Street connectivity</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_15']+' / km<sup>2</sup></td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_12">Distance to closest activity centre</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_12']+' km</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'trans_6'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#trans_6'+thresh_code+'">Regular serviced public transport within 400 m</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'trans_6'+thresh_code]+' %</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'trans_6'+thresh_code]+'</td></tr>'+
                       '<tr><td></td><td><small>*<a href="#destination_access">Destination accessibility</a> calculated using '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2016/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2016 Census QuickStats</a>',           {
             maxWidth: 400
           });
         });
       };


       if (lga) {
         lga.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties['p_'+ind_value]),
               fillOpacity: 0.7,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties['sa1'] +'<br>Suburb: ' + layer.feature.properties['suburb'] +'<br>LGA: ' + layer.feature.properties['lga'] + '<br><br><b>'+ layer_description +'</b><br>Average: '+  layer.feature.properties['r_'+ind_value]+' '+ind_units+'<br>Range: '+  layer.feature.properties['d_'+ind_value]+' '+ind_units+'<br>25th to 75th percentile (usual range): '+  layer.feature.properties['m_'+ind_value]+' '+ind_units);
           layer.setPopupContent('<table class="g-pop-table" width="450" height="300">'+
                       '<col width="0"><col width="290"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + layer.feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + layer.feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + layer.feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator summary *</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in this city:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_17'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_17'+thresh_code+'">Walkability index score (0 is average)</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_17'+thresh_code] +'</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_17'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_14'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_14'+thresh_code+'">Daily living score</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_14'+thresh_code]+' / 3</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_14'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_16">Dwelling density, gross</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_16']+' / Ha</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_15">Street connectivity</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_15']+' / km<sup>2</sup></td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_12">Distance to closest activity centre</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_12']+' km</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'trans_6'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#trans_6'+thresh_code+'">Regular serviced public transport within 400 m</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'trans_6'+thresh_code]+' %</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'trans_6'+thresh_code]+'</td></tr>'+
                       '<tr><td></td><td><small>*<a href="#destination_access">Destination accessibility</a> calculated using '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2016/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2016 Census QuickStats</a>',           {
             maxWidth: 400
           });
         });
       };


       if(ssc_search) {
         ssc_search.eachLayer(function(layer) {
             layer.setPopupContent('<table class="g-pop-table" width="450" height="300">'+
                       '<col width="0"><col width="290"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + layer.feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + layer.feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + layer.feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator summary *</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in this city:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_17'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_17'+thresh_code+'">Walkability index score (0 is average)</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_17'+thresh_code] +'</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_17'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_14'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_14'+thresh_code+'">Daily living score</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_14'+thresh_code]+' / 3</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_14'+thresh_code]+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_16">Dwelling density, gross</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_16']+' / Ha</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">&emsp; - <a href="#walk_15">Street connectivity</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_15']+' / km<sup>2</sup></td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#walk_12">Distance to closest activity centre</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'walk_12']+' km</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(layer.feature.properties['p_'+'trans_6'+thresh_code]) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator"><a href="#trans_6'+thresh_code+'">Regular serviced public transport within 400 m</a></i></td>'+
                       '<td align="center">' + layer.feature.properties['r_'+'trans_6'+thresh_code]+' %</td>'+
                       '<td align="center">' + layer.feature.properties['p_'+'trans_6'+thresh_code]+'</td></tr>'+
                       '<tr><td></td><td><small>*<a href="#destination_access">Destination accessibility</a> calculated using '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2016/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2016 Census QuickStats</a>',           {
               maxWidth: 400
             });
         });
       };
    };

    $(document).ready(function() {
      $("#inddrop").change(UpdateIndicatorList);
    });

    $(document).ready(function() {
      $("#about").click(function(e) {
         var selected_ind = document.getElementById("inddrop");
         var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
         window.location.replace("#"+ind_value);
      });
    });



    // Define study region border style
    function region_style(feature) {
      return {
        weight: 1.5,
        color: '#46abbe',
        fillOpacity: 0.8,
        opacity: 1
      };
    }

    // Define region border style
    function region_border_style(feature) {
      return {
        weight: 2,
        color: '#c2fce9',
        fillOpacity: 0,
        opacity: 0.9
      };
    }

    // change colour scheme function
    // - NOT FUNCTIONAL YET
    function set_scheme(x) {
        colourscheme = x;
        UpdateIndicatorList()
        map._controlCorners.bottomright.remove()
        legend.addTo(map);
    };


    // Define initial style
    function li_style(feature) {
      return {
        weight: 0.2,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties["p_"+init_ind])
      };
    }

    // Define suburb border style
    function ssc_border_style(feature) {
      return {
        weight: 1.5,
        color: '#fdf2ff',
        fillOpacity: 0,
        opacity: 0.9
      };
    }

    // Define lga border style
    function lga_border_style(feature) {
      return {
        weight: 2,
        color: '#FFF',
        fillOpacity: 0,
        opacity: 0.9
      };
    }


    // a null style function for info and search layers
    function null_style(feature) {
        return {
            weight: 0,
            color: '#d65454',
            fillOpacity: 0
        };
    }

    // highlight features function
    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 3,
        color: '#d65454',
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    }

    function resetHighlight(e) {
       var layer = e.target;
         layer.setStyle({
           weight: 0.2,
           color: 'white',
         });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToBack();
      }
    }

    function onEachFeature(feature, layer) {
      var selected_ind = document.getElementById("inddrop");
      var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
      var tags  = ind_value.split('_')
      var threshold = threshold2 = ''
      if (tags.indexOf('hard') > -1) {
        threshold  = ', hard threshold'
        threshold2 = 'hard threshold'
      }
      if (tags.indexOf('soft') > -1) {
        threshold  = ', soft threshold'
        threshold2 = 'soft threshold'
      }
      layer.bindTooltip('',{className:'feature_tooltip'});
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
      layer.bindPopup('',{
          maxWidth: 400
      });
    }

    function regionFilter(feature) {
      if (feature.properties.gccsa_name !== locale_to_region[locale]) return true
    }

    // Parse SA1 geojson data, adding to map
    window.parseResponseSA1 = function(data) {
      sa1 = L.geoJson(data, {
          id: 'ind',
          style: li_style,
          onEachFeature: onEachFeature
        });
      overlays.addBaseLayer({
        group: "Summary scale",
        collapsed: true,
		    name:  'SA1',
	      layer: sa1
        });
      UpdateIndicatorList();
    };

    // function highlightRegion(e) {
      // var layer = e.target;

      // layer.setStyle({
        // weight: 3,
        // color: '#d65454',
      // });

      // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        // layer.bringToFront();
      // }
    // }

    function resetRegion(e) {
       var layer = e.target;
       layer.setStyle({
          weight: 1.5,
          color: '#46abbe',
          fillOpacity: 0.8,
          opacity: 1
       });
       if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToBack();
      }
    }

    function onEachRegion(feature, layer) {
          layer.on({
              mouseover: highlightFeature,
              mouseout:  resetRegion,
              click:  clickedgeojson
          });
          layer.bindTooltip(feature.properties['gccsa_name'],{className: 'regiontext'});
    }

    //clickedgeojson function
    function clickedgeojson(e) {
         var layer = e.target;
        var region = layer.feature.properties['gccsa_name'];
        var city = region_to_locale[region];
        if (city!=locale){
         console.log(e)
         L.DomEvent.stopPropagation(e);
    	  $('#city').val(city);
         load_li_map(city,2016);
        }
    };

    function allAjaxCalls() {
    // All ajax calls to be run once we have user's access token

        $.ajax({
          url: li_region_url,
          maxFeatures: 8,
          dataType: 'jsonp',
          outputFormat: 'text/javascript',
          jsonp: 'format_options',
          jsonpCallback: 'callback:parseResponse_region'
        });

       $.ajax({
        url: ind_description,
        maxFeatures: 20,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponse_inds'
      });

      $.ajax({
        url: li_sa1_url,
        maxFeatures: 20,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponseSA1'
      });

      $.ajax({
        url: li_ssc_url,
        maxFeatures: 20,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponseSSC'
      });

      $.ajax({
        url: li_lga_url,
        maxFeatures: 31,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponseLGA'
      });

      $.ajax({
        url: boundaries_ssc_url,
        maxFeatures: 20,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponse_bSSC'
      });

      $.ajax({
        url: boundaries_lga_url,
        maxFeatures: 31,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponse_bLGA'
      });

      // $.ajax({
        // url: urban_sos_url,
        // maxFeatures: 31,
        // dataType: 'jsonp',
        // outputFormat: 'text/javascript',
        // jsonp: 'format_options',
        // jsonpCallback: 'callback:parseResponse_urban'
      // });

    };


    // Parse Suburb geojson data, adding to map
    window.parseResponseSSC = function(data) {
        ssc = L.geoJson(data, {
               id: 'ind',
               style: li_style,
               onEachFeature: onEachFeature
          }).addTo(map);
        overlays.addBaseLayer({
          group: "Summary scale",
          collapsed: true,
		      name:  'Suburb',
	        layer: ssc
          });

        // include layer for suburb search
        ssc_search = L.geoJson(data, {
          id: 'search',
          style: null_style,
          interactive: false,
          onEachFeature: function(feature, layer) {
            var selected_ind = document.getElementById("inddrop");
            var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
            var threshold = threshold2 = ''
            var tags  = ind_value.split('_')
            if (tags.indexOf('hard') > -1) {
              threshold  = ', hard threshold'
              threshold2 = 'hard threshold'
            }
            if (tags.indexOf('soft') > -1) {
              threshold  = ', soft threshold'
              threshold2 = 'soft threshold'
            }
            layer.bindPopup('',
              {
                maxWidth: 400,
              });
            }
        });

        UpdateIndicatorList();

        // Include a search box to jump to suburb
        var searchControl = new L.Control.Search({
          layer: ssc_search,
          propertyName: 'suburb',
          marker: false,
          moveToLocation: function(latlng, title, map) {
            //map.fitBounds( latlng.layer.getBounds() );
            var zoom = map.getBoundsZoom(latlng.layer.getBounds());
            map.setView(latlng, zoom); // access the zoom
          }
        });

        searchControl.on('search:locationfound', function(e) {
          e.layer.setStyle({
            fillColor: "white",
            color: "#6666ff",
            weight: 4,
            fillOpacity: 0.3
          });

          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            e.layer.bringToFront();
          }
          if (e.layer._popup) {
            e.layer.openPopup();
          }

          }).on('search:collapsed', function(e) {
        //});
        //searchControl.on('search:collapsed', function(e) {
          ssc_search.eachLayer(function(layer) { //restore feature color
            ssc_search.resetStyle(layer);
          });
        });

      map.addControl(searchControl); //inizialize search control

      // Suburb loading process
      $("div.info.legend.leaflet-control").attr('data-step','1');
      $("div.info.legend.leaflet-control").attr('data-intro',"The legend is used to evaluate the variation in performance on a chosen indicator for a selected city and timepoint.  Areas at the chosen scale (LGAs, suburbs or SA1s), are grouped into ten ranks according to their average values: dark blue represents the top 10 percent of areas within that city (for example, those suburbs who have the least distance to travel to an activity centre); dark red respresents the bottom 10 percent of areas having the least desirable values.");
      $('.leaflet-control-minimap').attr('data-step','2');
      $('.leaflet-control-minimap').attr('data-intro',"The mini inset map provides a broad-scale view of your location; this can be useful to get your bearings when you are zoomed in close.");
      $('.leaflet-control-search').attr('data-step','3');
      $('.leaflet-control-search').attr('data-intro',"Type and select a suburb's name using the search tool to display indicator summary information for a particular suburb.");
      $('#logo').attr('data-step','4');
      $('#logo').attr('data-intro',"Here you can select to refresh the zoom level and map position for the currently selected city, or return to the national view of all study regions.");
      introJs().start();
    };


    // Parse LGA geojson data, adding to map
    window.parseResponseLGA = function(data) {
      lga = L.geoJson(data, {
          id: 'ind',
          style: li_style,
          onEachFeature: onEachFeature
        });
      overlays.addBaseLayer({
        group: "Summary scale",
        collapsed: true,
		    name:  'LGA',
	      layer: lga
        });
      UpdateIndicatorList();
    }


    // add in boundary layers
    window.parseResponse_bSSC = function(data) {
      boundaries.addBaseLayer({
            group: "Boundary lines",
		    name:  'Suburb',
	        layer: L.geoJson(data, {
               id: 'ind',
               style: ssc_border_style,
               interactive: false
          })
        });
    }

    window.parseResponse_bLGA = function(data) {
      boundaries.addBaseLayer({
            group: "Boundary lines",
		    name:  'LGA',
	        layer: L.geoJson(data, {
               id: 'ind',
               style: lga_border_style,
               interactive: false
          })
        });
    }

    if(locale=='init'){
      window.parseResponse_region = function(data) {
          regions = L.geoJson(data, {
              id: 'region',
              style: region_style,
              onEachFeature: onEachRegion
            }).addTo(map);
      };

      // programmatically add intro attributes to dynamic elements
      $('#city').attr('data-step','1')
      $('#city').attr('data-intro','To get started, select a city and time point to zoom and load indicator map data for this region.')
      $('#inddrop').attr('data-step','2')
      $('#inddrop').attr('data-intro','Select indicator of interest from this list.')
      $('#about').attr('data-step','3')
      $('#about').attr('data-intro','Click here for more information about an indicator: what it means, how it was calculated and the policy it relates to.')
      $('#dropdown').attr('data-step','10')
      $('#dropdown').attr('data-intro','You can logout here when you are done, or if you need to switch users.')
      $("span:contains('Base layer')").attr('data-step', '4');
      $("span:contains('Base layer')").attr('data-intro', 'Satellite imagery or an OpenStreetMap (OSM) cartographic map theme may be chosen for a base layer.');
      $("span:contains('Summary scale')").attr('data-step', '5');
      $("span:contains('Summary scale')").attr('data-intro', "Once a city has been selected, you can choose the scale at which to view the indicator here: SA1 (<a href = 'http://www.abs.gov.au/ausstats/abs@.nsf/Lookup/by%20Subject/1270.0.55.001~July%202016~Main%20Features~Statistical%20Area%20Level%201%20(SA1)~10013'  target='_blank' >ABS Statistical Area 1)</a>; Suburb; or Local Government Area (LGA).  Areas are clipped to the residential portions for which data has been measured.  If you hover over one of the highlighted areas its summary information for the selected indicator will displayed here.  Click on an area for more detail, such as summaries of key indicators and link to an ABS community profile.");
      $("span:contains('Boundary lines')").attr('data-step', '6');
      $("span:contains('Boundary lines')").attr('data-intro', 'The full ABS-sourced boundary lines for suburbs and LGAs may be displayed on top of the indicator summary layer; for example, you may display LGA boundary lines while viewing SA1 level indicator estimates to visualise how a particular indicator varies across an LGA.');
    };

    if(locale!='init'){
      map.removeLayer(regions);
      window.parseResponse_region = function(data) {
        boundaries.addBaseLayer({
              group: "Boundary lines",
	  	    name:  'GCCSA',
	          layer: L.geoJson(data, {
                 id: 'region',
                 style: region_border_style,
                 interactive: false
            })
          });
      };

      // programmatically add intro attributes to dynamic elements
      $('#city').removeAttr('data-step');
      $('#city').removeAttr('data-intro');
      $('#inddrop').removeAttr('data-step');
      $('#inddrop').removeAttr('data-intro');
      $('#about').removeAttr('data-step');
      $('#about').removeAttr('data-intro');
      $('#dropdown').removeAttr('data-step');
      $('#dropdown').removeAttr('data-intro');
      $("span:contains('Base layer')").removeAttr('data-step');
      $("span:contains('Base layer')").removeAttr('data-intro');
      $("span:contains('Summary scale')").removeAttr('data-step');
      $("span:contains('Summary scale')").removeAttr('data-intro');
      $("span:contains('Boundary lines')").removeAttr('data-step');
      $("span:contains('Boundary lines')").removeAttr('data-intro');

      // remove layers and overlay panels if they exist
      $(".leaflet-control-search").remove()
      $("div.info.legend.leaflet-control").remove()

      // Add legend with city name annotated to emphasise its relative scale
      // Style and add legend
      legend = L.control({
          position: 'bottomright'
      });

      legend.onAdd = function(map) {
          var div = L.DomUtil.create('div', 'info legend'),
          quantiles = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
          labels = [],
          quantile = ['&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;', '&nbsp;'];
        labels.push('<b>'+proper_locale+'</b><table style="table-layout:fixed; line-height: 15px;" ><col width="20"><tr><td>High</td></tr>');
        for (var i = 0; i < quantiles.length; i++) {
          labels.push('<tr><td style="background:' + getColor(quantiles[i]) + '">' + quantile[i] + '</td>');
        }
        div.innerHTML = labels.join('</tr>') + '</tr><tr><td>Low</td></tr></table>';
        return div;
      };

      legend.addTo(map);

      // Note: introjs items are loaded in the suburb layer loading process
    }

    // Toggle logout dropdown
    var logoutToggle = document.getElementById("dropdown");
    logoutToggle.onclick = function(event) {
      //toggle dropdown list
      document.getElementById("myDropdown").classList.toggle("show");
    };

    // Logout
    logout = document.getElementById('logout');
    logout.onclick = function() {
      // Post logout form to GeoNode
      var csrftoken = Cookies.get('csrftoken');

      $.ajax({
        type: "POST",
        url: "/geonode/account/logout/",
        data: {csrfmiddlewaretoken : csrftoken},
        success: function(data) {
          // Log out of GeoServer and return to home page
          $.ajax({
            type: "POST",
            url: "/geoserver/j_spring_security_logout",
            success: function(data) {
              window.location.hash = "authenticate";
            },
            error: function(data) {
              $.ajax({
                type: "POST",
                url: "/geoserver/j_spring_security_logout",
                success: function(data) {
                  // GeoServer bug means we have to log out twice!
                  window.location.hash = "authenticate";
                },
                error: function(data) {
                  console.log("failed to log out of GeoServer");
                }
              });
            }
          });
        },
        error: function(data) {
          console.log("logout failure");
        }
      });
    };
}
