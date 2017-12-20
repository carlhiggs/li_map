function load_li_map() {
    // Create variable to hold map element, give initial settings to map
    // Melb coords: -37.8078244,144.9625175
    // Centered on Black Rock

    map = L.map('map', {
       center: [-37.966909, 145.023575],
       zoom: 10,
       minZoom: 8,
       maxZoom: 17,
    });
    
    // Define basemaps
    bmap_satellite = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    bmap_satellite_attrib = '&copy; <a href="http://www.esri.com/" title="Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community">Esri</a>';
    bmap_basic = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
    bmap_basic_attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    // add attribution
    map.attributionControl.addAttribution('Liveability Index &copy; <a href="http://cur.org.au/research-programs/healthy-liveable-cities-group/">Healthy Liveable Cities Group, RMIT</a>'+' | '+bmap_basic_attrib+' | '+bmap_satellite_attrib);
    
    // create underlay basemaps pane; to be kept underneath otherlayers
    map.createPane('underlay');
    map.getPane('underlay').style.zIndex = 0;
    map.getPane('underlay').style.pointerEvents = 'none';
    
    // // indicator selection menu splitter - NOT WORKING
    // // based on  http://jsfiddle.net/fgdxcgx3/3/
    // $(function () { // wait for page to load
        // var domainDropdown = $("#inddrop"),
            // indicatorDropdown = $('<select></select>'), // create a indicator dropdown
            // indicators = []; // ordered list of indicators
        
        // // parse the nested dropdown
        // domainDropdown.children().each(function () {
            // var group = $(this),
                // indicatorName = group.attr('label'),
                // option;
            
            // // create an option for the indicator
            // option = $('<option></option>').text(indicatorName);
            
            // // store the associated domain options
            // option.data('inddrop', group.children());
            
            // // check if the indicator should be selected
            // if( group.find(':selected').length > 0 ) {
                // option.prop('selected', true);
            // }
            
            // // add the indicator to the dropdown
            // indicatorDropdown.append(option);
        // });
        
        // // add the indicator dropdown to the page
        // domainDropdown.before(indicatorDropdown);
        
        // // this function updates the domain dropdown based on the selected indicator
        // function updateDomains() {
            // var indicator = indicatorDropdown.find(':selected');
            // domainDropdown.empty().append(indicator.data('Domains'));
        // }
        
        // // call the function to set the initial Domains
        // updateDomains();
        
        // // and add the change handler
        // indicatorDropdown.on('change', updateDomains);
    // });
    ind_desc = [
 {
   "F4":  ", hard threshold",
   "F5":  ", hard threshold",
   "F6":  ", hard threshold",
   "F7":  "",
   "F8":  "",
   "F9":  ", hard threshold",
   "F10": ", hard threshold",
   "F11": ", hard threshold",
   "F12": "",
   "F13": "",
   "F14": "",
   "F15": ", hard threshold",
   "F16": ", hard threshold",
   "F17": ", hard threshold",
   "F18": "",
   "F19": "",
   "F20": ", hard threshold",
   "F21": ", hard threshold",
   "F22": ", hard threshold",
   "F23": "",
   "F24": "",
   "F25": "",
   "F34": ", soft threshold",
   "F35": ", soft threshold",
   "F36": ", soft threshold",
   "F37": "",
   "F38": "",
   "F39": ", soft threshold",
   "F40": ", soft threshold",
   "F41": ", soft threshold",
   "F42": "",
   "F43": "",
   "F44": "",
   "F45": ", soft threshold",
   "F46": ", soft threshold",
   "F47": ", soft threshold",
   "F48": "",
   "F49": "",
   "F50": ", soft threshold",
   "F51": ", soft threshold",
   "F52": ", soft threshold",
   "F53": "",
   "F54": "",
   "F55": ""
 },
 {
   "F4": "raw",
   "F5": "raw",
   "F6": "raw",
   "F7": "raw",
   "F8": "raw",
   "F9": "raw",
   "F10": "raw",
   "F11": "raw",
   "F12": "raw",
   "F13": "raw",
   "F14": "raw",
   "F15": "percentile",
   "F16": "percentile",
   "F17": "percentile",
   "F18": "percentile",
   "F19": "percentile",
   "F20": "percentile",
   "F21": "percentile",
   "F22": "percentile",
   "F23": "percentile",
   "F24": "percentile",
   "F25": "percentile",
   "F34": "raw",
   "F35": "raw",
   "F36": "raw",
   "F37": "raw",
   "F38": "raw",
   "F39": "raw",
   "F40": "raw",
   "F41": "raw",
   "F42": "raw",
   "F43": "raw",
   "F44": "raw",
   "F45": "percentile",
   "F46": "percentile",
   "F47": "percentile",
   "F48": "percentile",
   "F49": "percentile",
   "F50": "percentile",
   "F51": "percentile",
   "F52": "percentile",
   "F53": "percentile",
   "F54": "percentile",
   "F55": "percentile"
 },
 {
   "F4": "Liveability",
   "F5": "Walkability Index",
   "F6": "Daily Living (/3)",
   "F7": "Dwellings per Ha",
   "F8": "3+ way street connections per km2",
   "F9": "Social infrastructure mix (/16)",
   "F10": "PT access meets policy (%)",
   "F11": "POS ? 1.5Ha within 400m (%)",
   "F12": "Air quality (rev. Mesh Block NO? ppb.)",
   "F13": "Affordable housing (30/40 rule, SA1 %)",
   "F14": "Live & work w/in SA3 (SA2 %)",
   "F15": "Liveability",
   "F16": "Walkability Index",
   "F17": "Daily Living (/3)",
   "F18": "Dwellings per Ha",
   "F19": "3+ way street connections per km2",
   "F20": "Social infrastructure mix (/16)",
   "F21": "PT access meets policy (%)",
   "F22": "POS ? 1.5Ha within 400m (%)",
   "F23": "Air quality (rev. Mesh Block NO? ppb.)",
   "F24": "Affordable housing (30/40 rule, SA1 %)",
   "F25": "Live & work w/in SA3 (SA2 %)",
   "F34": "Liveability",
   "F35": "Walkability Index",
   "F36": "Daily Living (/3)",
   "F37": "Dwellings per Ha",
   "F38": "3+ way street connections per km2",
   "F39": "Social infrastructure mix (/16)",
   "F40": "PT access meets policy (%)",
   "F41": "POS ? 1.5Ha within 400m (%)",
   "F42": "Air quality (rev. Mesh Block NO? ppb.)",
   "F43": "Affordable housing (30/40 rule, SA1 %)",
   "F44": "Live & work w/in SA3 (SA2 %)",
   "F45": "Liveability",
   "F46": "Walkability Index",
   "F47": "Daily Living (/3)",
   "F48": "Dwellings per Ha",
   "F49": "3+ way street connections per km2",
   "F50": "Social infrastructure mix (/16)",
   "F51": "PT access meets policy (%)",
   "F52": "POS ? 1.5Ha within 400m (%)",
   "F53": "Air quality (rev. Mesh Block NO? ppb.)",
   "F54": "Affordable housing (30/40 rule, SA1 %)",
   "F55": "Live & work w/in SA3 (SA2 %)"
 }
]
    // Indicator selection menu: restyle map and present summary overlay
    function UpdateIndicatorList() {
      var selected_ind = document.getElementById("inddrop");
      var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
      // window.location.replace("#"+ind_value);
      sa1.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties.F1 +'<br>Suburb: ' + layer.feature.properties.F2 +'<br>LGA: ' + layer.feature.properties.F3 + '<br><br><b>'+ind_desc[2][ind_value]+ind_desc[0][ind_value]+'</b><br>Average:'+layer.feature.properties[ind_value]+'<br>Range: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i><br>75% of residential lots: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i>');
       });


     
      ssc.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties.F1 +'<br>Suburb: ' + layer.feature.properties.F2 +'<br>LGA: ' + layer.feature.properties.F3 + '<br><br><b>'+ind_desc[2][ind_value]+ind_desc[0][ind_value]+'</b><br>Average:'+layer.feature.properties[ind_value]+'<br>Range: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i><br>75% of residential lots: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i>');
       });
    
      lga.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.setTooltipContent('SA1: ' + layer.feature.properties.F1 +'<br>Suburb: ' + layer.feature.properties.F2 +'<br>LGA: ' + layer.feature.properties.F3 + '<br><br><b>'+ind_desc[2][ind_value]+ind_desc[0][ind_value]+'</b><br>Average:'+layer.feature.properties[ind_value]+'<br>Range: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i><br>75% of residential lots: <i>'+layer.feature.properties[ind_value]+' to '+layer.feature.properties[ind_value]+'</i>');
       });   

    };
    
    // // If popup is open and user clicks outside, close popup
    // $(document).click(function(event) {
        // if (window.location.hash.substring(0,2)=='#F') {
            // if ( $(event.target).closest(".popup").get(0) == null ) {         
                // window.location.replace("#");       
                // }
        // }
    // });
 
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

    
    // Add tiles, mini-map, scale bar and legend to map
    var bmap2,
        miniMap,
        legend;

    // add mini-map
    bmap2 = new L.TileLayer(bmap_basic, {
        minZoom: 0,
        maxZoom: 13,
        attribution: bmap_basic_attrib
    });

    miniMap = new L.Control.MiniMap(bmap2, {
        position: 'bottomleft'
    }).addTo(map);

    // add scale bar
    L.control.scale().addTo(map);

    // define colour schemes
    coloursets = {
        'pgrn': ['#276419','#4d9221','#7fbc41','#b8e186','#e6f5d0','#fde0ef','#f1b6da','#de77ae','#c51b7d','#8e0152','#f7f7f7'],
        'BrBG':['#003c30','#01665e','#35978f','#80cdc1','#c7eae5','#f5f5f5','#f6e8c3','#dfc27d','#bf812d','#8c510a','#543005'],
         'RdYlBu':['#313695','#4575b4','#74add1','#abd9e9','#e0f3f8','#ffffbf','#fee090','#fdae61','#f46d43','#d73027','#a50026']
    }
    
    // initialise colourscheme
    colourscheme = 'RdYlBu'
    
    // Colour based on percentile
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
               p > 0  ? coloursets[colourscheme][9]:
                        coloursets[colourscheme][10];
    }
    
    // function to scale a percentile to a quantile (e.g. for quintile, num = 20)
    function requantile(p, num) {
      return Math.floor((p - 1) / num) + 1;
    }
    
    // column graph indicator scale function
    function bgWidth(value){
      return (value/100)*230 +'px'
    }     

    // Style and add legend
    legend = L.control({
        position: 'bottomright'
    });
    
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
        quantiles = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10],
        labels = [],
        quantile = ['100 High', '90', '80', '70', '60', '50', '40', '30', '20', '10 Low'];
      labels.push('<table style="table-layout:fixed;"><col width="20"><col width="8"><col width="80">');
      for (var i = 0; i < quantiles.length; i++) {
        labels.push('<tr><td style="background:' + getColor(quantiles[i]) + '"></td><td></td><td>' + quantile[i] + '</td>');
      }
      div.innerHTML = labels.join('</tr>') + '</tr></table>';
      return div;
    };

    legend.addTo(map);

    // change colour scheme function
    // - NOT FUNCTIONAL YET
    function set_scheme(x) {
        colourscheme = x;
        UpdateIndicatorList()
        map._controlCorners.bottomright.remove()
        legend.addTo(map);
    };


    // Define initial style (liveability index)
    function li_style(feature) {
      return {
        weight: 0.2,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.F15)
      };
    }
    
    // Define initial style (liveability index)
    function border_style(feature) {
      return {
        weight: 1.5,
        color: '#46abbe',
        fillOpacity: 0
      };
    }

    // WFS data        
    var li_sa1_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_sa1&outputFormat=text%2Fjavascript";
    var li_ssc_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_ssc&outputFormat=text%2Fjavascript";   
    var li_lga_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_lga&outputFormat=text%2Fjavascript";
    
    // a null style functino for info and search layers
    function null_style(feature) {
        return {
            weight: 0,
            color: '#d65454',
            fillOpacity: 0,
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
      layer.bindTooltip('SA1: ' + feature.properties.F1 +'<br>Suburb: ' + feature.properties.F2 +'<br>LGA: ' + feature.properties.F3 + '<br><br><b>'+ind_desc[2][ind_value]+': '+ind_desc[1][ind_value]+'</b><br>Average:'+feature.properties[ind_value]+'<br>Range: <i>'+feature.properties[ind_value]+' to '+feature.properties[ind_value]+'</i><br>75% of residential lots: <i>'+feature.properties[ind_value]+' to '+feature.properties[ind_value]+'</i>');
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
      layer.bindPopup('<table class="g-pop-table" width="400" height="300"><col width="0"><col width="240"><col width="80"><col width="80"><tbody><tr><td></td><td><b>SA1: ' + feature.properties.F1 + '</b></td><td></td><td></td> </tr>    <tr><td></td><td><b>Suburb: </b>' + feature.properties.F2 + '</td><td></td><td></td>  </tr><tr><td></td><td><b>LGA: </b>' + feature.properties.F3 + '</td><td></td><td></td></tr><tr></tr><tr><td></td><td><b>Indicator</b></td><td align="center"><b>Average</b></td><td align="center"><b>Score (/100)</b></td></tr><tr><td style="position: relative;"><div class="g-ind-main" style="width:' + bgWidth(feature.properties.F15) + ';"></div></td><td><i><b>Liveability Index</b></i></td><td align="center"><b></b></td>   <td align="center"><b>' + feature.properties.F15 + '</b></td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F16) + ';"></div></td><td><i>&emsp;Walkability Index</i></td><td align="center"></td>   <td align="center">' + feature.properties.F16 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F17) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Daily Living (/3)</i></td><td align="center">' + feature.properties.F6 + '</td>   <td align="center">' + feature.properties.F17 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F18) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Dwellings per Ha</i></td><td align="center">' + feature.properties.F7 + '</td>   <td align="center">' + feature.properties.F18 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F19) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- 3+ way street connections per km<sup>2</sup></i></td><td align="center">' + feature.properties.F8 + '</td>   <td align="center">' + feature.properties.F19 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F20) + ';"></div></td><td><i>&emsp;Social infrastructure mix (/16)</i></td><td align="center">' + feature.properties.F9 + '</td>  <td align="center">' + feature.properties.F20 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F21) + ';"></div></td><td><i>&emsp;PT access meets policy (%)</i></td><td align="center">' + feature.properties.F10 + '</td>   <td align="center">' + feature.properties.F21 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F22) + ';"></div></td><td><i>&emsp;POS &ge; 1.5Ha within 400m (%)</i></td><td align="center">' + feature.properties.F11 + '</td><td align="center">' + feature.properties.F22 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F23) + ';"></div></td><td><i>&emsp;Air quality (rev. Mesh Block NO&#x2082; ppb.)</i></td><td align="center">' + feature.properties.F12 + '</td><td align="center">' + feature.properties.F23 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F24) + ';"></div></td><td><i>&emsp;Affordable housing (30/40 rule, SA1 %)</i></td><td align="center">' + feature.properties.F13 + '</td><td align="center">' + feature.properties.F24 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F25) + ';"></div></td><td><i>&emsp;Live & work w/in SA3 (SA2 %)</i></td><td align="center">' + feature.properties.F14 + '</td><td align="center">' + feature.properties.F25 + '</td></tr></tbody></table>', {
        maxWidth: 400
      });
    }
    
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
		    name:  'Basic',
	      layer: L.tileLayer(bmap_basic),
          pane: 'underlay',
        });    

    //  Ensure that active boundary lines are foregrounded when overlay changes
    overlays._form.onchange = function() {
     boundaries._layers.forEach(function (obj) {
       if (obj.name!="Off" && obj.layer._map!=null){
         obj.layer.bringToFront();
         }
    });   
    };    
        
    // Parse geojson data, adding to map
    window.parseResponseSA1 = function(data) {
      sa1 = L.geoJson(data, {
          id: 'ind',
          style: li_style,
          onEachFeature: onEachFeature
        });
      overlays.addBaseLayer({
        group: "Summary scale", //note: this is not working yet
        collapsed: true,
		    name:  'SA1',
	      layer: sa1
        });
    }

    $.ajax({
      url: li_sa1_url,
      maxFeatures: 20,
      dataType: 'jsonp',
      outputFormat: 'text/javascript',
      jsonp: 'format_options',
      jsonpCallback: 'callback:parseResponseSA1'
    });

    window.parseResponseSSC = function(data) {
        ssc = L.geoJson(data, {
               id: 'ind',
               style: li_style,
               onEachFeature: onEachFeature
          }).addTo(map);
        overlays.addBaseLayer({
          group: "Summary scale", //note: this is not working yet
          collapsed: true,
		      name:  'Suburb',
	        layer: ssc
          });
        boundaries.addBaseLayer({
          group: "Boundary lines", //note: this is not working yet
		      name:  'Suburb',
	        layer: L.geoJson(data, {
               id: 'ind',
               style: border_style,
               interactive: false
          })
        });
        
        // include layer for suburb search
        ssc_search = L.geoJson(data, {
          id: 'search',
          style: null_style,
          interactive: false,
          onEachFeature: function(feature, layer) {
            layer.bindPopup('<table class="g-pop-table" width="400" height="300"><col width="0"><col width="240"><col width="80"><col width="80"><tbody><tr><td></td><td><b>SA1: ' + feature.properties.F1 + '</b></td><td></td><td></td> </tr>    <tr><td></td><td><b>Suburb: </b>' + feature.properties.F2 + '</td><td></td><td></td>  </tr><tr><td></td><td><b>LGA: </b>' + feature.properties.F3 + '</td><td></td><td></td></tr><tr></tr><tr><td></td><td><b>Indicator</b></td><td align="center"><b>Average</b></td><td align="center"><b>Score (/100)</b></td></tr><tr><td style="position: relative;"><div class="g-ind-main" style="width:' + bgWidth(feature.properties.F15) + ';"></div></td><td><i><b>Liveability Index</b></i></td><td align="center"><b></b></td>   <td align="center"><b>' + feature.properties.F15 + '</b></td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F16) + ';"></div></td><td><i>&emsp;Walkability Index</i></td><td align="center"></td>   <td align="center">' + feature.properties.F16 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F17) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Daily Living (/3)</i></td><td align="center">' + feature.properties.F6 + '</td>   <td align="center">' + feature.properties.F17 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F18) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Dwellings per Ha</i></td><td align="center">' + feature.properties.F7 + '</td>   <td align="center">' + feature.properties.F18 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.F19) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- 3+ way street connections per km<sup>2</sup></i></td><td align="center">' + feature.properties.F8 + '</td>   <td align="center">' + feature.properties.F19 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F20) + ';"></div></td><td><i>&emsp;Social infrastructure mix (/16)</i></td><td align="center">' + feature.properties.F9 + '</td>  <td align="center">' + feature.properties.F20 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F21) + ';"></div></td><td><i>&emsp;PT access meets policy (%)</i></td><td align="center">' + feature.properties.F10 + '</td>   <td align="center">' + feature.properties.F21 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F22) + ';"></div></td><td><i>&emsp;POS &ge; 1.5Ha within 400m (%)</i></td><td align="center">' + feature.properties.F11 + '</td><td align="center">' + feature.properties.F22 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F23) + ';"></div></td><td><i>&emsp;Air quality (rev. Mesh Block NO&#x2082; ppb.)</i></td><td align="center">' + feature.properties.F12 + '</td><td align="center">' + feature.properties.F23 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F24) + ';"></div></td><td><i>&emsp;Affordable housing (30/40 rule, SA1 %)</i></td><td align="center">' + feature.properties.F13 + '</td><td align="center">' + feature.properties.F24 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.F25) + ';"></div></td><td><i>&emsp;Live & work w/in SA3 (SA2 %)</i></td><td align="center">' + feature.properties.F14 + '</td><td align="center">' + feature.properties.F25 + '</td></tr></tbody></table>', {
          maxWidth: 400,
              });
            }
        });
    
        // Include a search box to jump to suburb
        var searchControl = new L.Control.Search({
          layer: ssc_search,
          propertyName: 'f2',
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
          if (e.layer._popup)
            e.layer.openPopup();
        }).on('search:collapsed', function(e) {
          ssc_search.eachLayer(function(layer) { //restore feature color
            ssc_search.resetStyle(layer);
          });
        });
       
        map.addControl(searchControl); //inizialize search control        
        };        

    $.ajax({
      url: li_ssc_url,
      maxFeatures: 20,
      dataType: 'jsonp',
      outputFormat: 'text/javascript',
      jsonp: 'format_options',
      jsonpCallback: 'callback:parseResponseSSC'
    });

    // Parse geojson data, adding to map
    window.parseResponseLGA = function(data) {
      lga = L.geoJson(data, {
          id: 'ind',
          style: li_style,
          onEachFeature: onEachFeature
        });
      overlays.addBaseLayer({
        group: "Summary scale", //note: this is not working yet
        collapsed: true,
		    name:  'LGA',
	      layer: lga
        });
      boundaries.addBaseLayer({
          group: "Boundary lines", //note: this is not working yet
		       name:  'LGA',
	           layer: L.geoJson(data, {
               id: 'ind',
               style: border_style,
               interactive: false
          })
        });
    }

    $.ajax({
      url: li_lga_url,
      maxFeatures: 31,
      dataType: 'jsonp',
      outputFormat: 'text/javascript',
      jsonp: 'format_options',
      jsonpCallback: 'callback:parseResponseLGA'
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

    // programmatically add intro attributes to dynamic elements
    // $('leaflet-control-search leaflet-control').attr('data-step', "3")
    // $('leaflet-control-search leaflet-control').attr('data-intro', "Search for a suburb here to locate and display its summary information for all indicators.")
    // $('#sa1_overlay').attr('data-step', '4');
    // $('#sa1_overlay').attr('data-intro', 'The currently selected map is displayed here --- the Liveability Index, for SA1 areas (an ABS definition, like a local neighbourhood).  If you hover over one of the highlighted areas its value for this indicator will displayed here.  Click on an area for more detail.');
    // $('#info_overlay').attr('data-step', '5');
    // $('#info_overlay').attr('data-intro', 'Summary information can be retrieved either at the SA1 or Suburb level');
    // $('#bmap_overlay').attr('data-step', '6');
    // $('#bmap_overlay').attr('data-intro', 'The background map can be toggled between a basic gray scale map, or a satellite view.  The latter may be useful to examine local built environment in light of the displayed indicators.');
    // $('a.leaflet-control-layers-toggle').attr('data-step', '7');
    // $('a.leaflet-control-layers-toggle').attr('data-intro', 'The displayed map elements summarised above can be changed here; hover over this icon to display the options.  For example, you could select to view the "Walkability Index" at the suburb level.');

  }
