function load_li_map() {
    //"use strict";

    // get color depending on population density value
    function getColor(p) {
      // Decile colours
      // pgrn colour scheme - diverging
        return p > 90 ? '#276419' :
                p > 80 ? '#4d9221' :
                        p > 70 ? '#7fbc41' :
                                p > 60 ? '#b8e186' :
                                        p > 50 ? '#e6f5d0' :
                                                p > 40 ? '#fde0ef' :
                                                        p > 30 ? '#f1b6da' :
                                                                p > 20 ? '#de77ae' :
                                                                        p > 10 ? '#c51b7d' :
                                                                                p > 0 ? '#8e0152' :
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

    // Add tiles, mini-map, scale bar and legend to map
    var sat_tiles,
        basic_tiles,
        baseMaps,
        bmap2,
        miniMap,
        legend;

    // add tiles to map
    sat_tiles = L.tileLayer(bmap_sat, {
        attribution: bmap_sat_attrib
    });

    basic_tiles = L.tileLayer(bmap_cartodb, {
        attribution: bmap_cartodb_attrib
    }).addTo(map);

    baseMaps = {
        "Cartographic": basic_tiles,
        "Satellite": sat_tiles
    };

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


    // Define indicator specific styles
    function li_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f15)
      };
    }

    function wa_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f16)
      };
    }

    function dl_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f17)
      };
    }

    function dd_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f18)
      };
    }

    function sc_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f19)
      };
    }

    function si_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f20)
      };
    }

    function pt_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f21)
      };
    }

    function po_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f22)
      };
    }

    function pr_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f23)
      };
    }

    function af_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f24)
      };
    }

    function lw_style(feature) {
      return {
        weight: 1,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f25)
      };
    }

    function sa1_li_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f15)
      };
    }

    function sa1_wa_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f16)
      };
    }

    function sa1_dl_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f17)
      };
    }

    function sa1_dd_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f18)
      };
    }

    function sa1_sc_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f19)
      };
    }

    function sa1_si_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f20)
      };
    }

    function sa1_pt_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f21)
      };
    }

    function sa1_po_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f22)
      };
    }

    function sa1_pr_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f23)
      };
    }

    function sa1_af_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f24)
      };
    }

    function sa1_lw_style(feature) {
      return {
        weight: 0,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.f25)
      };
    }

    var li_sa1_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_json_sa1_min_soft&outputFormat=text%2Fjavascript";
    var li_ssc_url = "http://bilbo.australiasoutheast.cloudapp.azure.com/geoserver/geonode/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:clean_li_map_json_ssc_min_soft&outputFormat=text%2Fjavascript";

    var ssc, sa1;
    var li_sa1 = L.geoJson();
    var wa_sa1 = L.geoJson();
    var dl_sa1 = L.geoJson();
    var dd_sa1 = L.geoJson();
    var sc_sa1 = L.geoJson();
    var si_sa1 = L.geoJson();
    var pt_sa1 = L.geoJson();
    var po_sa1 = L.geoJson();
    var pr_sa1 = L.geoJson();
    var af_sa1 = L.geoJson();
    var lw_sa1 = L.geoJson();

    window.parseResponseSA1 = function(data) {
      sa1 = data;
      var li_sa1 = L.geoJson(sa1, {
        id: 'ind',
        style: sa1_li_style,
        interactive: false
      }).addTo(map);
      var wa_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_wa_style,
          interactive: false
        }),
        dl_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_dl_style,
          interactive: false
        }),
        dd_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_dd_style,
          interactive: false
        }),
        sc_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_sc_style,
          interactive: false
        }),
        si_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_si_style,
          interactive: false
        }),
        pt_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_pt_style,
          interactive: false
        }),
        po_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_po_style,
          interactive: false
        }),
        pr_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_pr_style,
          interactive: false
        }),
        af_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_af_style,
          interactive: false
        }),
        lw_sa1 = L.geoJson(sa1, {
          id: 'ind',
          style: sa1_lw_style,
          interactive: false
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

    var li_ssc = L.geoJson();
    var wa_ssc = L.geoJson();
    var dl_ssc = L.geoJson();
    var dd_ssc = L.geoJson();
    var sc_ssc = L.geoJson();
    var si_ssc = L.geoJson();
    var pt_ssc = L.geoJson();
    var po_ssc = L.geoJson();
    var pr_ssc = L.geoJson();
    var af_ssc = L.geoJson();
    var lw_ssc = L.geoJson();


    window.parseResponseSSC = function(data) {
      ssc = data;
      var li_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: li_style,
          interactive: false
        }),
        wa_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: wa_style,
          interactive: false
        }),
        dl_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: dl_style,
          interactive: false
        }),
        dd_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: dd_style,
          interactive: false
        }),
        sc_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: sc_style,
          interactive: false
        }),
        si_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: si_style,
          interactive: false
        }),
        pt_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: pt_style,
          interactive: false
        }),
        po_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: po_style,
          interactive: false
        }),
        pr_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: pr_style,
          interactive: false
        }),
        af_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: af_style,
          interactive: false
        }),
        lw_ssc = L.geoJson(ssc, {
          id: 'ind',
          style: lw_style,
          interactive: false
        });
    };

    $.ajax({
      url: li_ssc_url,
      maxFeatures: 20,
      dataType: 'jsonp',
      outputFormat: 'text/javascript',
      jsonp: 'format_options',
      jsonpCallback: 'callback:parseResponseSSC'
    });


    // column graph indicator scale function
    function bgWidth(value) {
      return (value / 100) * 230 + 'px'
    }

    //  create graph function --- not implemented, but it should be!
    function bgGraph(value) {
      return '<div class="g-ind-sub" style="width:' + (value / 100) * 230 + 'px ;background:' + getColor(value) + ';"></div>'
    }

    // initialise info variables (used in functions prior to definition)
    var ssc_info;
    var sa1_info;

    // store initial state which will be referenced before actually assigned
    var info_text = " SA1"
    var sa1_info_text = " Liveability Index"
    var ssc_info_text = " -"

    // function to scale a percentile to a quantile (e.g. for quintile, num = 20)
    function requantile(p, num) {
      return Math.floor((p - 1) / num) + 1;
    }

    // a null style functino for info and search layers
    function null_style(feature) {
      return {
        weight: 0,
        color: '#d65454',
        fillOpacity: 0,
      };
    }

    function retrieveUpdate(id, field) {
      if (document.getElementById(id) !== null) {
        document.getElementById(id).innerHTML = field;
      }
    }

    function resetUpdate(id, field) {
      if (document.getElementById(id) !== null) {
        document.getElementById(id).innerHTML = '-';
      }
    }

    // highlight features function
    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 3,
        dashArray: '',
        fillOpacity: 0.3
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      getIndVar = function(current_ind) {
        return current_ind === " Liveability Index" ? String(": " + layer.feature.properties.f15) :
          current_ind === " Walkability Index" ? String(": " + layer.feature.properties.f16) :
          current_ind === "  - Daily Living (/3)" ? String(": " + layer.feature.properties.f17) :
          current_ind === "  - Dwellings per Ha" ? String(": " + layer.feature.properties.f18) :
          current_ind === "  - 3+ way street connections per Ha" ? String(": " + layer.feature.properties.f19) :
          current_ind === " Social infrastructure mix (/16)    " ? String(": " + layer.feature.properties.f20) :
          current_ind === " PT access meets policy (%)" ? String(": " + layer.feature.properties.f21) :
          current_ind === " POS ≥ 1.5Ha within 400m (%)    " ? String(": " + layer.feature.properties.f22) :
          current_ind === " Air quality (rev. Mesh Block NO&#x2082; ppb.)" ? String(": " + layer.feature.properties.f23) :
          current_ind === " Affordable housing (30/40 rule, SA1 %)" ? String(": " + layer.feature.properties.f24) :
          current_ind === " Live & work w/in SA3 (SA2 %)" ? String(": " + layer.feature.properties.f25) :
          " ";
      }
      if (info_text === " SA1" && sa1_info_text !== " -") {
        document.getElementById("sa1_overlay").innerHTML = sa1_info_text + getIndVar(sa1_info_text);
      }
      if (info_text === " Suburb" && ssc_info_text !== " -") {
        document.getElementById("ssc_overlay").innerHTML = ssc_info_text + getIndVar(ssc_info_text);
      }

      retrieveUpdate("sa1_hover", layer.feature.properties.f1)
      retrieveUpdate("suburb_hover", layer.feature.properties.f2)
      retrieveUpdate("lga_hover", layer.feature.properties.f3)
      retrieveUpdate("li_hover", layer.feature.properties.f15);
    }

    function resetHighlight(e) {
      sa1_info.resetStyle(e.target);
      ssc_info.resetStyle(e.target);
      resetUpdate("sa1_hover");
      resetUpdate("suburb_hover");
      resetUpdate("lga_hover");
      resetUpdate("li_hover");
      if (info_text === " SA1" && sa1_info_text !== " -") {
        document.getElementById("sa1_overlay").innerHTML = sa1_info_text;
      }
      if (info_text === " Suburb" && ssc_info_text !== " -") {
        document.getElementById("ssc_overlay").innerHTML = ssc_info_text;
      }
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

    // add info polygon data
    sa1_info = L.geoJson(sa1, {
      id: 'info',
      style: null_style,
      onEachFeature: onEachFeature
    }).addTo(map);

    // add info polygon data
    ssc_info = L.geoJson(ssc, {
      id: 'info',
      style: null_style,
      onEachFeature: onEachFeature
    });

    // add search polygon data
    ssc_search = L.geoJson(ssc, {
      id: 'search',
      style: null_style,
      interactive: false,
      onEachFeature: function(feature, layer) {
        layer.bindPopup('<table class="g-pop-table" width="400" height="300"><col width="0"><col width="240"><col width="80"><col width="80"><tbody><tr><td></td><td><b>SA1: ' + feature.properties.f1 + '</b></td><td></td><td></td> </tr>    <tr><td></td><td><b>Suburb: </b>' + feature.properties.f2 + '</td><td></td><td></td>  </tr><tr><td></td><td><b>LGA: </b>' + feature.properties.f3 + '</td><td></td><td></td></tr><tr></tr><tr><td></td><td><b>Indicator</b></td><td align="center"><b>Average</b></td><td align="center"><b>Score (/100)</b></td></tr><tr><td style="position: relative;"><div class="g-ind-main" style="width:' + bgWidth(feature.properties.f15) + ';"></div></td><td><i><b>Liveability Index</b></i></td><td align="center"><b></b></td>   <td align="center"><b>' + feature.properties.f15 + '</b></td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f16) + ';"></div></td><td><i>&emsp;Walkability Index</i></td><td align="center"></td>   <td align="center">' + feature.properties.f16 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f17) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Daily Living (/3)</i></td><td align="center">' + feature.properties.f6 + '</td>   <td align="center">' + feature.properties.f17 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f18) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- Dwellings per Ha</i></td><td align="center">' + feature.properties.f7 + '</td>   <td align="center">' + feature.properties.f18 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties.f19) + '; height: 100% ; background: #ffb3b3;"></div></td><td><i class=".subindicator">&emsp;&emsp;- 3+ way street connections per Ha</i></td><td align="center">' + feature.properties.f8 + '</td>   <td align="center">' + feature.properties.f19 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f20) + ';"></div></td><td><i>&emsp;Social infrastructure mix (/16)</i></td><td align="center">' + feature.properties.f9 + '</td>  <td align="center">' + feature.properties.f20 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f21) + ';"></div></td><td><i>&emsp;PT access meets policy (%)</i></td><td align="center">' + feature.properties.f10 + '</td>   <td align="center">' + feature.properties.f21 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f22) + ';"></div></td><td><i>&emsp;POS &ge; 1.5Ha within 400m (%)</i></td><td align="center">' + feature.properties.f11 + '</td><td align="center">' + feature.properties.f22 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f23) + ';"></div></td><td><i>&emsp;Air quality (rev. Mesh Block NO&#x2082; ppb.)</i></td><td align="center">' + feature.properties.f12 + '</td><td align="center">' + feature.properties.f23 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f24) + ';"></div></td><td><i>&emsp;Affordable housing (30/40 rule, SA1 %)</i></td><td align="center">' + feature.properties.f13 + '</td><td align="center">' + feature.properties.f24 + '</td></tr><tr><td style="position: relative;"><div class="g-ind-sub" style="width:' + bgWidth(feature.properties.f25) + ';"></div></td><td><i>&emsp;Live & work w/in SA3 (SA2 %)</i></td><td align="center">' + feature.properties.f14 + '</td><td align="center">' + feature.properties.f25 + '</td></tr></tbody></table>', {
          maxWidth: 400,
        });
      }
    });

    // Function to hide and display text (not currentle implemented -- e.g. in info box)
    function toggle() {
      var ele = document.getElementById("toggleText");
      var text = document.getElementById("displayText");
      if (ele.style.display == "block") {
        ele.style.display = "none";
        text.innerHTML = "Detail &#9650;";
      } else {
        ele.style.display = "block";
        text.innerHTML = "Detail &#9660;";
      }
    }

    // initiate custom info box variable
    var info = L.control();

    info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function() {
      this._div.innerHTML = '<h4>Pilot Liveability Index (Melbourne, 2011)</h4><table class="g-pop-table" width="500" ><col width="80"><col width="160"><col width="260"><tbody><tr><td></td><td><b>Area (on hover)</b></td><td><b>Display setting</b></td></tr><tr><td><i>SA1    </i></td><td><i><div id="sa1_hover"></div></i></td><td><i><div id="sa1_overlay"></div></i></td></tr><tr><td><i>Suburb </i></td><td><i><div id="suburb_hover"></div></i></td><td><i><div id="ssc_overlay"></div></i></td></tr><tr><td><i>LGA</i></td><td><i><div id="lga_hover"></div></i></td><td>-</td></tr><tr><td><i>Info   </i></td><td>-</td><td><i><div id="info_overlay"></div></i></td></tr><tr><td><i>Basemap</i></td><td>-</td><td><i><div id="bmap_overlay"></div></i></td></tr></tbody></table><a id="displayText" href="javascript:toggle("Detail");"><div id="toggleText" style="display: none">Detail &#9650;</a>Liveability: <div id="li_hover">-</div></div>';
    };
    info.addTo(map);

    // Define elements for layer selection panel
    var baseLayers = {
      "Cartographic": basic_tiles,
      "Satellite": sat_tiles
    };

    var null_base = {
      'Empty': L.tileLayer(''),
      'OpenStreetMap': L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
      })
    };


    var groupedOverlays = {
      "SA1 regions": {
        "Liveability Index": li_sa1,
        "Walkability Index": wa_sa1,
        " - Daily Living (/3)": dl_sa1,
        " - Dwellings per Ha": dd_sa1,
        " - 3+ way street connections per Ha": sc_sa1,
        "Social infrastructure mix (/16)    ": si_sa1,
        "PT access meets policy (%)": pt_sa1,
        "POS ≥ 1.5Ha within 400m (%)    ": po_sa1,
        "Air quality (rev. Mesh Block NO&#x2082; ppb.)": pr_sa1,
        "Affordable housing (30/40 rule, SA1 %)": af_sa1,
        "Live & work w/in SA3 (SA2 %)": lw_sa1,
        "-": null_base.Empty
      },
      "Suburbs": {
        "Liveability Index": li_ssc,
        "Walkability Index": wa_ssc,
        " - Daily Living (/3)": dl_ssc,
        " - Dwellings per Ha": dd_ssc,
        " - 3+ way street connections per Ha": sc_ssc,
        "Social infrastructure mix (/16)    ": si_ssc,
        "PT access meets policy (%)": pt_ssc,
        "POS ≥ 1.5Ha within 400m (%)    ": po_ssc,
        "Air quality (rev. Mesh Block NO&#x2082; ppb.)": pr_ssc,
        "Affordable housing (30/40 rule, SA1 %)": af_ssc,
        "Live & work w/in SA3 (SA2 %)": lw_ssc,
        "-": null_base.Empty
      },
      "Summary info scale": {
        "SA1": sa1_info,
        "Suburb": ssc_info,
        "-": null_base.Empty
      }
    };

    var options = {
      // Make the "Landmarks" group exclusive (use radio inputs)
      exclusiveGroups: ["Suburbs", "SA1 regions", "Summary info scale"],
      // Show a checkbox next to non-exclusive group labels for toggling all
      groupCheckboxes: true
    };


    layers_list = L.control.groupedLayers(baseLayers, groupedOverlays, options).addTo(map);


    // Disable dragging when user's cursor enters the element
    layers_list.getContainer().addEventListener('mouseover', function() {
      map.scrollWheelZoom.disable();
    });

    // Re-enable dragging when user's cursor leaves the element
    layers_list.getContainer().addEventListener('mouseout', function() {
      map.scrollWheelZoom.enable();
    });

    // Set initial text in info box for layer display settings
    document.getElementById("bmap_overlay").innerHTML = "Cartographic"
    document.getElementById("sa1_overlay").innerHTML = sa1_info_text
    document.getElementById("ssc_overlay").innerHTML = ssc_info_text
    document.getElementById("info_overlay").innerHTML = info_text

    // Update text in info box for layer display settings when changed
    $("[name='leaflet-base-layers']").change(function() {
      document.getElementById("bmap_overlay").innerHTML = $('input[type=radio][name=leaflet-base-layers]:checked').next()["0"].innerHTML
    });
    $("[name='leaflet-exclusive-group-layer-1']").change(function() {
      sa1_info_text = $('input[type=radio][name=leaflet-exclusive-group-layer-1]:checked').next()["0"].innerHTML
      document.getElementById("sa1_overlay").innerHTML = sa1_info_text
    });
    $("[name='leaflet-exclusive-group-layer-2']").change(function() {
      ssc_info_text = $('input[type=radio][name=leaflet-exclusive-group-layer-2]:checked').next()["0"].innerHTML
      document.getElementById("ssc_overlay").innerHTML = ssc_info_text
      // return(ssc_info_text)
    });
    $("[name='leaflet-exclusive-group-layer-3']").change(function() {
      info_text = $('input[type=radio][name=leaflet-exclusive-group-layer-3]:checked').next()["0"].innerHTML
      document.getElementById("info_overlay").innerHTML = info_text
      // return(info_text)
    });

    // redefine outline width based on zoom level
    map.on('zoomend', function() {
      currentZoom = map.getZoom();
      if (currentZoom > 9) {
        li_sa1.setStyle({
          weight: 0.5
        });
        wa_sa1.setStyle({
          weight: 0.5
        });
        dl_sa1.setStyle({
          weight: 0.5
        });
        dd_sa1.setStyle({
          weight: 0.5
        });
        sc_sa1.setStyle({
          weight: 0.5
        });
        si_sa1.setStyle({
          weight: 0.5
        });
        pt_sa1.setStyle({
          weight: 0.5
        });
        po_sa1.setStyle({
          weight: 0.5
        });
        pr_sa1.setStyle({
          weight: 0.5
        });
        af_sa1.setStyle({
          weight: 0.5
        });
        lw_sa1.setStyle({
          weight: 0.5
        });
      } else {
        li_sa1.setStyle({
          weight: 0
        });
        wa_sa1.setStyle({
          weight: 0
        });
        dl_sa1.setStyle({
          weight: 0
        });
        dd_sa1.setStyle({
          weight: 0
        });
        sc_sa1.setStyle({
          weight: 0
        });
        si_sa1.setStyle({
          weight: 0
        });
        pt_sa1.setStyle({
          weight: 0
        });
        po_sa1.setStyle({
          weight: 0
        });
        pr_sa1.setStyle({
          weight: 0
        });
        af_sa1.setStyle({
          weight: 0
        });
        lw_sa1.setStyle({
          weight: 0
        });
      }
    });


    // add full screen toggle
    map.addControl(new L.Control.Fullscreen());

    // add sidebar
    var sidebar = L.control.sidebar('sidebar').addTo(map);

    // D3 plot
    // to be implemented: histogram of selected indicator

    // add save to .png functions
    var printer = L.easyPrint({
      title: 'Download snapshot to png (ctr+alt+s): **this may take some time to process!!**',
      tileLayer: basic_tiles,
      filename: 'LiveabilityIndexExport',
      exportOnly: true,
      hideControlContainer: false
    }).addTo(map);

    // keyboard short cut for save image
    document.onkeyup = function(e) {
      var e = e || window.event; // for IE to cover IEs window event-object
      if (e.altKey && e.which == 83) {
        printer.printMap('CurrentSize', 'LiveabilityIndexExport');
      }
    }

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

    // programmatically add intro attributes to dynamic elements
    $('leaflet-control-search leaflet-control').attr('data-step', "3")
    $('leaflet-control-search leaflet-control').attr('data-intro', "Search for a suburb here to locate and display its summary information for all indicators.")
    $('#sa1_overlay').attr('data-step', '4');
    $('#sa1_overlay').attr('data-intro', 'The currently selected map is displayed here --- the Liveability Index, for SA1 areas (an ABS definition, like a local neighbourhood).  If you hover over one of the highlighted areas its value for this indicator will displayed here.  Click on an area for more detail.');
    $('#info_overlay').attr('data-step', '5');
    $('#info_overlay').attr('data-intro', 'Summary information can be retrieved either at the SA1 or Suburb level');
    $('#bmap_overlay').attr('data-step', '6');
    $('#bmap_overlay').attr('data-intro', 'The background map can be toggled between a basic gray scale map, or a satellite view.  The latter may be useful to examine local built environment in light of the displayed indicators.');
    $('a.leaflet-control-layers-toggle').attr('data-step', '7');
    $('a.leaflet-control-layers-toggle').attr('data-intro', 'The displayed map elements summarised above can be changed here; hover over this icon to display the options.  For example, you could select to view the "Walkability Index" at the suburb level.');

  }
