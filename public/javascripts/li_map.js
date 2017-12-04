function load_li_map() {
    //"use strict";

    // get color depending on population density value
    function getColor(p) {
      // Decile colours
      // pgrn colour scheme - diverging
        return p > 90 ? '#276419':
               p > 80 ? '#4d9221':
               p > 70 ? '#7fbc41':
               p > 60 ? '#b8e186':
               p > 50 ? '#e6f5d0':
               p > 40 ? '#fde0ef':
               p > 30 ? '#f1b6da':
               p > 20 ? '#de77ae':
               p > 10 ? '#c51b7d':
               p > 0  ? '#8e0152':
                        '#f7f7f7';
    }
    
    // Create variable to hold map element, give initial settings to map
    // Melb coords: -37.8078244,144.9625175
    // Centered on Black Rock
    // define ESRI satellite layer
    // define CartoDB.Positron tile layer to map element

    var map, bmap_sat, bmap_sat_attrib, bmap_cartodb, bmap_cartodb_attrib;

    //var map = L.map('map',{ center: [-37.966909, 145.023575], zoom: 10,minZoom: 8,maxZoom: 17});

    map = L.map('map', {
       center: [-37.966909, 145.023575],
       zoom: 10,
       minZoom: 8,
       maxZoom: 17,
    });

    bmap_sat = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    bmap_sat_attrib = '&copy; <a href="http://www.esri.com/" title="Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community">Esri</a>';
    bmap_cartodb = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
    bmap_cartodb_attrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>';

    // add attribution
    map.attributionControl.addAttribution('Liveability Index &copy; <a href="http://cur.org.au/research-programs/healthy-liveable-cities-group/">Healthy Liveable Cities Group, RMIT</a>');
    
    



    function UpdateIndicatorList() {
      var selected_ind = document.getElementById("inddrop");
      var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
      window.location.replace("#"+ind_value);
      sa1.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.5,
               color: 'white',
           });
       });
      ssc.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.5,
               color: 'white',
           });
       });
    };
    
 
    $(document).ready(function() {
      $("#inddrop").change(UpdateIndicatorList);
    });


    // Add tiles, mini-map, scale bar and legend to map
    var sat_tiles,
        basic_tiles,
        baseMaps,
        bmap2,
        miniMap,
        legend;

    // // add tiles to map
    // sat_tiles = L.tileLayer(bmap_sat, {
        // attribution: bmap_sat_attrib
    // }).addTo(map);

    // basic_tiles = L.tileLayer(bmap_cartodb, {
        // attribution: bmap_cartodb_attrib
    // });

    // baseMaps = {
        // "Cartographic": basic_tiles,
        // "Satellite": sat_tiles
    // };

    bmap2 = new L.TileLayer(bmap_cartodb, {
        minZoom: 0,
        maxZoom: 13,
        attribution: bmap_cartodb_attrib
    });

    // add scale bar
    L.control.scale().addTo(map);

    // add mini-map
    miniMap = new L.Control.MiniMap(bmap2, {
        position: 'bottomleft'
    }).addTo(map);

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


    // Define initial style (liveability index)
    function li_style(feature) {
      return {
        weight: 0.5,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f15)
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
    var li_sa1_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_json_sa1_min_soft&outputFormat=text%2Fjavascript";
    var li_ssc_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_json_ssc_min_soft&outputFormat=text%2Fjavascript";


    // function to scale a percentile to a quantile (e.g. for quintile, num = 20)
    function requantile(p, num) {
      return Math.floor((p - 1) / num) + 1;
    }
    
    // column graph indicator scale function
    function bgWidth(value){
      return (value/100)*230 +'px'
    }        

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
           weight: 0.5,
           color: 'white',
         });
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
      layer.bindPopup('<table class="g-pop-table" width="400" height="300"><col width="0"><col width="240"><col width="80"><col width="80"><tbody><tr><td></td><td><b>SA1: ' + feature.properties.f1 + '</b></td><td></td><td></td> </tr>    <tr><td></td><td><b>Suburb: </b>' + feature.properties.f2 + '</td><td></td><td></td>  </tr><tr><td></td><td><b>LGA: </b>' + feature.properties.f3 + '</td><td></td><td></td></tr><tr></tr><tr><td></td><td><b>Indicator</b></td><td align="center"><b>Average</b></td><td align="center"><b>Score (/100)</b></td></tr><tr><td style="position: relative;"><div class="g-ind-main" style="width:' + bgWidth(feature.properties.f15) + ';"></div></td><td><i><b>Liveability Index</b></i></td><td align="center"><b></b></td>   <td align="center"><b>' + feature.properties.f15 + '</b></td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f16) + ';"></div></td><td><i>&emsp;Walkability Index</i></td><td align="center"></td>   <td align="center">' + feature.properties.f16 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f17) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Daily Living (/3)</i></td><td align="center">' + feature.properties.f6 + '</td>   <td align="center">' + feature.properties.f17 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f18) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Dwellings per Ha</i></td><td align="center">' + feature.properties.f7 + '</td>   <td align="center">' + feature.properties.f18 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f19) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- 3+ way street connections per Ha</i></td><td align="center">' + feature.properties.f8 + '</td>   <td align="center">' + feature.properties.f19 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f20) + ';"></div></td><td><i>&emsp;Social infrastructure mix (/16)</i></td><td align="center">' + feature.properties.f9 + '</td>  <td align="center">' + feature.properties.f20 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f21) + ';"></div></td><td><i>&emsp;PT access meets policy (%)</i></td><td align="center">' + feature.properties.f10 + '</td>   <td align="center">' + feature.properties.f21 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f22) + ';"></div></td><td><i>&emsp;POS &ge; 1.5Ha within 400m (%)</i></td><td align="center">' + feature.properties.f11 + '</td><td align="center">' + feature.properties.f22 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f23) + ';"></div></td><td><i>&emsp;Air quality (rev. Mesh Block NO&#x2082; ppb.)</i></td><td align="center">' + feature.properties.f12 + '</td><td align="center">' + feature.properties.f23 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f24) + ';"></div></td><td><i>&emsp;Affordable housing (30/40 rule, SA1 %)</i></td><td align="center">' + feature.properties.f13 + '</td><td align="center">' + feature.properties.f24 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f25) + ';"></div></td><td><i>&emsp;Live & work w/in SA3 (SA2 %)</i></td><td align="center">' + feature.properties.f14 + '</td><td align="center">' + feature.properties.f25 + '</td></tr></tbody></table>', {
        maxWidth: 400
      });
    }
    
    basemaps = L.control.panelLayers(
    [
        {
            group: "Base layers",
            collapsed: true,
            layers:[
                   {
                       "active": true,
                       "name": "Satellite",
                       "layer": L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png")
                   },
                   {
                       "name": "Basic",
                       "layer": L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png")
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
            layers: []
          }
    ],[],{compact: true}
    ).addTo(map);
    

    // Parse geojson data, adding to map
    window.parseResponseSA1 = function(data) {
      sa1 = L.geoJson(data, {
          id: 'ind',
          style: li_style,
          onEachFeature: onEachFeature
        }).addTo(map);
      overlays.addBaseLayer({
        group: "Summary scale", //note: this is not working yet
		    name:  'SA1 summary',
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
             })
        overlays.addBaseLayer({
          group: "Summary scale", //note: this is not working yet
		      name:  'Suburb summary',
	        layer: ssc
          });
        overlays.addOverlay({
          group: "Summary scale", //note: this is not working yet
		      name:  'Suburb borders',
	        layer: L.geoJson(data, {
               id: 'ind',
               style: border_style,
               interactive: false
             }).addTo(map)
          });
        
       
        ssc_search = L.geoJson(data, {
          id: 'search',
          style: null_style,
          interactive: false,
          onEachFeature: function(feature, layer) {
            layer.bindPopup('<table class="g-pop-table" width="400" height="300"><col width="0"><col width="240"><col width="80"><col width="80"><tbody><tr><td></td><td><b>SA1: ' + feature.properties.f1 + '</b></td><td></td><td></td> </tr>    <tr><td></td><td><b>Suburb: </b>' + feature.properties.f2 + '</td><td></td><td></td>  </tr><tr><td></td><td><b>LGA: </b>' + feature.properties.f3 + '</td><td></td><td></td></tr><tr></tr><tr><td></td><td><b>Indicator</b></td><td align="center"><b>Average</b></td><td align="center"><b>Score (/100)</b></td></tr><tr><td style="position: relative;"><div class="g-ind-main" style="width:' + bgWidth(feature.properties.f15) + ';"></div></td><td><i><b>Liveability Index</b></i></td><td align="center"><b></b></td>   <td align="center"><b>' + feature.properties.f15 + '</b></td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f16) + ';"></div></td><td><i>&emsp;Walkability Index</i></td><td align="center"></td>   <td align="center">' + feature.properties.f16 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f17) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Daily Living (/3)</i></td><td align="center">' + feature.properties.f6 + '</td>   <td align="center">' + feature.properties.f17 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f18) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Dwellings per Ha</i></td><td align="center">' + feature.properties.f7 + '</td>   <td align="center">' + feature.properties.f18 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f19) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- 3+ way street connections per Ha</i></td><td align="center">' + feature.properties.f8 + '</td>   <td align="center">' + feature.properties.f19 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f20) + ';"></div></td><td><i>&emsp;Social infrastructure mix (/16)</i></td><td align="center">' + feature.properties.f9 + '</td>  <td align="center">' + feature.properties.f20 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f21) + ';"></div></td><td><i>&emsp;PT access meets policy (%)</i></td><td align="center">' + feature.properties.f10 + '</td>   <td align="center">' + feature.properties.f21 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f22) + ';"></div></td><td><i>&emsp;POS &ge; 1.5Ha within 400m (%)</i></td><td align="center">' + feature.properties.f11 + '</td><td align="center">' + feature.properties.f22 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f23) + ';"></div></td><td><i>&emsp;Air quality (rev. Mesh Block NO&#x2082; ppb.)</i></td><td align="center">' + feature.properties.f12 + '</td><td align="center">' + feature.properties.f23 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f24) + ';"></div></td><td><i>&emsp;Affordable housing (30/40 rule, SA1 %)</i></td><td align="center">' + feature.properties.f13 + '</td><td align="center">' + feature.properties.f24 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f25) + ';"></div></td><td><i>&emsp;Live & work w/in SA3 (SA2 %)</i></td><td align="center">' + feature.properties.f14 + '</td><td align="center">' + feature.properties.f25 + '</td></tr></tbody></table>', {
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
    
    // // set up map layers
    // var conf = {
      // base: {
        // title: 'Settings',
        // layers: [
          // {
            // group: "Base layers",
            // collapsed: true,
            // layers:[
              // {
                // "active": true,
                // "name": "Satellite",
                // "layer": L.tileLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png")
              // },
                // {
                 // "name": "Basic",
                 // "layer": L.tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png")
                // }
                // ]
              // },
          // {
            // group: "Summary scale",
            // layers: [
              // {
                // name: "Statistical Area 1 (SA1)",
                // layer: sa1
              // }, 
              // {
                // name: "Suburb",
                // layer: ssc
              // }
                  // ]
          // }
        // ]
      // }
    // };
    // var base1 = L.control.panelLayers(conf.base.layers, null,  {
      // title: conf.base.title,
    	// position: 'topright',
    	// compact: true
    // }).addTo(map);
    
    // // Alternate approach to layer grouping

    // // Define elements for layer selection panel
    // var baseLayers = {
      // "Cartographic": basic_tiles,
      // "Satellite": sat_tiles
    // };

    // var null_base = {
      // 'Empty': L.tileLayer(''),
      // 'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        // 'attribution': 'Map data &copy; OpenStreetMap contributors'
      // })
    // };

    // var groupedOverlays = {
      // "Area scale": {
        // "Statistical Area 1": sa1,
        // "Suburb": ssc,
        // "-": null_base.Empty
      // },
      // "Boundaries": {
        // "Statistical Area 1": sa1_border,
        // "Suburb": ssc_border,
        // "-": null_base.Empty
      // }
    // };

    // var options = {
      // // Make the "Landmarks" group exclusive (use radio inputs)
      // exclusiveGroups: ["Area scale", "Boundaries"],
      // // Show a checkbox next to non-exclusive group labels for toggling all
      // groupCheckboxes: true
    // };


    // layers_list = L.control.groupedLayers(baseLayers, groupedOverlays, options).addTo(map);


    // // Disable dragging when user's cursor enters the element
    // layers_list.getContainer().addEventListener('mouseover', function() {
      // map.scrollWheelZoom.disable();
    // });

    // // Re-enable dragging when user's cursor leaves the element
    // layers_list.getContainer().addEventListener('mouseout', function() {
      // map.scrollWheelZoom.enable();
    // });


    // add full screen toggle
    map.addControl(new L.Control.Fullscreen());


    // // add save to .png functions
    // var printer = L.easyPrint({
      // title: 'Download snapshot to png (ctr+alt+s): **this may take some time to process!!**',
      // tileLayer: basic_tiles,
      // filename: 'LiveabilityIndexExport',
      // exportOnly: true,
      // hideControlContainer: false
    // }).addTo(map);

    // // keyboard short cut for save image
    // document.onkeyup = function(e) {
      // var e = e || window.event; // for IE to cover IEs window event-object
      // if (e.altKey && e.which == 83) {
        // printer.printMap('CurrentSize', 'LiveabilityIndexExport');
      // }
    // }



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
