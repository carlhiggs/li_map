function load_li_map() {
    // Create variable to hold map element, give initial settings to map
    // Melb coords: -37.8078244,144.9625175
    // Centered on Black Rock

    // var leadType = Cookies.get('csrftoken');
    // var target = document.getElementsByName('csrfmiddlewaretoken')[ 0 ];
    //
    // target.value = leadType;
    // console.log(target.value);
    // console.log(leadType);
    // console.log(target.value);
    // console.log(leadType);


    // Get token from GeoNode for access to geoserver
    // Load profile page and pilfer access token from link to user layers document

    var sa1, ssc, lga, ssc_search;
    // Submit form from here rather than in li_map.jade
    var username, access_token_url, token_href, access_token;
    var profile_page_url, status, loggedin_status, session_id;

    var ind_description, li_sa1_url, li_ssc_url, li_lga_url, vic_ugb;
    
    // For test purposes we define the locale and year here
    // Later, we will have these selectable from respect lists; perhaps with start default
    var locale = "perth"
    var year = "2016"
    var init = "walk_12"
    status = document.getElementById("status");
    loggedin_status = status.getAttribute("data-status");
    session_id = status.getAttribute("data-session");

    if(loggedin_status == 1) {
      // Logged in - get access token from GeoNode

      window.location.hash = "observatory";

      $.ajax({
        type: "GET",
        url: "/geonode",
        dataType: "html",
        success: function(data) {
          // get profile page url
          var re = /\/people\/profile\/\w*\b/;
          var search = re.exec(data);
          profile_page_url = search[0];

          $.ajax({
            type:"GET",
            url: profile_page_url,
            dataType: "html",
            success: function(data) {
              // get access token
              re = /\?access_token=[^"]*/;
              search = re.exec(data);
              var access_token_blob = search[0];
              access_token = access_token_blob.split("=")[1];
              // load data from GeoServer through multiple ajax calls
              // WFS data
              ind_description = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:ind_description_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
              li_sa1_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_sa1_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
              li_ssc_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_ssc_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
              li_lga_url = "/geoserver/geonode/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=geonode:li_map_lga_"+locale+"_"+year+"&outputFormat=text%2Fjavascript";
              vic_ugb    = "/geoserver/landuse_vic/ows?access_token=" + access_token + "&service=WFS&version=2.0.0&request=GetFeature&typeName=landuse_vic:vic_plan_ugb_dissolved&outputFormat=text%2Fjavascript";
              allAjaxCalls();
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


    $("login_form").submit(function(event) {
      var form = $(this);
      submitForm(form);
    });


    $("signup_form").submit(function(event){
      var form = $(this);
      submitForm(form);
    });


    function submitForm(form) {
      // Pull url and action directly from form
      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.FormData(),
        success: function(data) {
          // Can't do anything here due to GeoNode redirect.
        },
        error: function(data) {
          // Can't do anything here due to GeoNode redirect.
        }
      });

      event.preventDefault(); // Prevent the form from submitting via the browser
    };


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

    ind_desc = {'walk_12'      : 'Average distance to closest activity centre',
                'walk_14_hard ': 'Average number of daily living types present',
                'walk_14_soft ': 'Average number of daily living types present',
                'walk_16'      : 'Dwelling density per Ha',
                'walk_17_hard' : 'Walkability index',
                'walk_17_soft' : 'Walkability index',
                'trans_6_hard' : 'Lots within 400m of regular public transport (%)',
                'trans_6_soft' : 'Lots within 400m of regular public transport (%)',
                'pos_2_hard'   : '< / >= 100% of residential lots < 300 m of any public open space',
                'pos_2_soft'   : '< / >= 100% of residential lots < 300 m of any public open space',
                'pos_3_hard'   : '< / >= 50% of residential lots < 400 m of any local park >0.4 to <=1 ha',
                'pos_3_soft'   : '< / >= 50% of residential lots < 400 m of any local park >0.4 to <=1 ha',
                'pos_4_hard'   : '< / >= 50% of residential lots < 800 m of any neighbourhood park >1 ha - <= 5ha',
                'pos_4_soft'   : '< / >= 50% of residential lots < 800 m of any neighbourhood park >1 ha - <= 5ha',
                'pos_5_hard'   : '< / >= 50% of residential lots < 2 km of any district park >5 ha (<=20 ha)',
                'pos_5_soft'   : '< / >= 50% of residential lots < 2 km of any district park >5 ha (<=20 ha)',
                'pos_10_hard'  : 'Lots within 400 m of public open space (%)',
                'pos_10_soft'  : 'Lots within 400 m of public open space (%)',
                'pos_11_hard'  : 'Lots within 400 m of large public open space (%)',
                'pos_11_soft'  : 'Lots within 400 m of large public open space (%)',
                'food_1'       : 'Proportion of supermarkets to supermarkets and fast food outlets combined < 3200 m',
                'food_2_hard'  : '% residential lots < 1km of a supermarket',
                'food_2_soft'  : '% residential lots < 1km of a supermarket',
                'alc_1'        : 'Average number of on-licenses  within 400 m of residential lots',
                'alc_2'        : 'Average number of off-licenses within 800 m of residential lots'}
                
    // Indicator selection menu: restyle map and present summary overlay
    function UpdateIndicatorList() {
      var selected_ind = document.getElementById("inddrop");
      var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
      var tags  = ind_value.split('_')
      if (tags.indexOf('hard') > -1) {
        threshold  = ', hard threshold'
        threshold2 = 'hard threshold'
      }
      if (tags.indexOf('soft') > -1) {
        threshold  = ', soft threshold'
        threshold2 = 'soft threshold'
      }
       if (sa1) {
         sa1.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.bindTooltip('SA1: ' + feature.properties['sa1'] +'<br>Suburb: ' + feature.properties['suburb'] +'<br>LGA: ' + feature.properties['LGA'] + '<br><br><b>'+ind_desc[strip_val]+threshold+'</b><br>Average:'+feature.properties['r_'+ind_value]+'<br>Range: <i>'+feature.properties['d_'+ind_value]+'</i><br>90% of residential lots: <i>'+feature.properties['m_'+ind_value]+'</i>');
           layer.setPopupContent('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>',
           {
             maxWidth: 400
           });
         });
       };


       if (ssc) {
         ssc.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.bindTooltip('SA1: ' + feature.properties['sa1'] +'<br>Suburb: ' + feature.properties['suburb'] +'<br>LGA: ' + feature.properties['LGA'] + '<br><br><b>'+ind_desc[strip_val]+threshold+'</b><br>Average:'+feature.properties['r_'+ind_value]+'<br>Range: <i>'+feature.properties['d_'+ind_value]+'</i><br>90% of residential lots: <i>'+feature.properties['m_'+ind_value]+'</i>');
           layer.setPopupContent('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>',
           {
             maxWidth: 400
           });
         });
       };


       if (lga) {
         lga.eachLayer(function(layer) {
           layer.setStyle({
               fillColor: getColor(layer.feature.properties[ind_value]),
               fillOpacity: 0.8,
               weight: 0.2,
               color: 'white',
           });
           layer.bindTooltip('SA1: ' + feature.properties['sa1'] +'<br>Suburb: ' + feature.properties['suburb'] +'<br>LGA: ' + feature.properties['LGA'] + '<br><br><b>'+ind_desc[strip_val]+threshold+'</b><br>Average:'+feature.properties['r_'+ind_value]+'<br>Range: <i>'+feature.properties['d_'+ind_value]+'</i><br>90% of residential lots: <i>'+feature.properties['m_'+ind_value]+'</i>');
           layer.setPopupContent('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>',
           {
             maxWidth: 400
           });
         });
       };


       if(ssc_search) {
         ssc_search.eachLayer(function(layer) {
             layer.setPopupContent('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>',
             {
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


    // Define initial style
    function li_style(feature) {
      return {
        weight: 0.2,
        color: 'white',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties[init_ind])
      };
    }

    // Define border style
    function border_style(feature) {
      return {
        weight: 1.5,
        color: '#ffff33',
        fillOpacity: 0
      };
    }


    // a null style function for info and search layers
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
      var tags  = ind_value.split('_')
      if (tags.indexOf('hard') > -1) {
        threshold  = ', hard threshold'
        threshold2 = 'hard threshold'
      }
      if (tags.indexOf('soft') > -1) {
        threshold  = ', soft threshold'
        threshold2 = 'soft threshold'
      }
      layer.bindTooltip('SA1: ' + feature.properties['sa1'] +'<br>Suburb: ' + feature.properties['suburb'] +'<br>LGA: ' + feature.properties['LGA'] + '<br><br><b>'+ind_desc[strip_val]+threshold+'</b><br>Average:'+feature.properties['r_'+ind_value]+'<br>Range: <i>'+feature.properties['d_'+ind_value]+'</i><br>90% of residential lots: <i>'+feature.properties['m_'+ind_value]+'</i>');
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
      });
      layer.bindPopup('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>', {
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


    function allAjaxCalls() {
    // All ajax calls to be run once we have user's access token
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
        url: vic_ugb,
        maxFeatures: 31,
        dataType: 'jsonp',
        outputFormat: 'text/javascript',
        jsonp: 'format_options',
        jsonpCallback: 'callback:parseResponseUGB'
      });
    };


    // Parse SA1 geojson data, adding to map
    window.parseResponse_inds = function(data) {
      // update drop menu with indicator items
    };    

    // Parse SA1 geojson data, adding to map
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
      UpdateIndicatorList();
    };    
    
    // Parse Suburb geojson data, adding to map
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
            var selected_ind = document.getElementById("inddrop");
            var ind_value = selected_ind.options[selected_ind.selectedIndex].value;
            var tags  = ind_value.split('_')
            if (tags.indexOf('hard') > -1) {
              threshold  = ', hard threshold'
              threshold2 = 'hard threshold'
            }
            if (tags.indexOf('soft') > -1) {
              threshold  = ', soft threshold'
              threshold2 = 'soft threshold'
            }
            layer.bindPopup('<table class="g-pop-table" width="400" height="300">'+
                       '<col width="0"><col width="240"><col width="80"><col width="80">'+
                       '<tbody><tr><td></td><td><b>SA1: ' + feature.properties['sa1'] + '</b></td><td></td><td></td> </tr>'+
                       '<tr><td></td><td><b>Suburb: </b>' + feature.properties['suburb'] + '</td><td></td><td></td>  </tr>'+
                       '<tr><td></td><td><b>LGA: </b>'    + feature.properties['lga'] + '</td><td></td><td></td></tr>'+
                       '<tr></tr>'+
                       '<tr><td></td><td><b>Indicator</b></td><td align="center"><div class="tooltip">Average<span class="tooltiptext">Mean value of the raw indicator in its original units for the selected area</span></div></td><td align="center"><div class="tooltip">Percentile<span class="tooltiptext">Rank of the selected area relative to all others in Melbourne:<br>100 (high) <br>50 (average)<br>0 (low)</span></div></td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_12']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Distance to closest activity centre (km)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_12']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_12']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_13']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Pedshed ratio</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_13']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_13']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_14_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Daily living score (/3)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_14_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_14_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_15']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Street connectivity (per km<sup>2</sup)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_15']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_15']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_16']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Dwelling density (per Ha)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_16']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_16']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'walk_17_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Walkability index score</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'walk_17_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'walk_17_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'trans_6_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400m of regular public transport (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'trans_6_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'trans_6_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_10_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_10_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_10_soft']+'</td></tr>'+
                       '<tr><td style="position: relative;"><div class="g-ind-alt" style="width:' + bgWidth(feature.properties['p_'+'pos_11_soft']) + '; height: 100% ; background: #ffb3b3;"></div></td>'+
                       '<td><i class=".subindicator">Lots within 400 m of large public open space (%)</i></td>'+
                       '<td align="center">' + feature.properties['r_'+'pos_11_soft']+'</td>'+
                       '<td align="center">' + feature.properties['p_'+'pos_11_soft']+'</td></tr>'+
                       '<tr><td></td><td><small>* '+threshold2+'</small></td></tr></tbody></table>More about this community: <a target="_blank" href="http://www.censusdata.abs.gov.au/census_services/getproduct/census/2011/quickstat/'+layer.feature.properties["community_code"]+'?opendocument">ABS 2011 Census QuickStats</a>',
              {
                maxWidth: 400,
              });
            }
        });

        UpdateIndicatorList();

        // Include a search box to jump to suburb
        var searchControl = new L.Control.Search({
          layer: ssc_search,
          propertyName: 'F2',
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
    };


    // Parse LGA geojson data, adding to map
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
      UpdateIndicatorList();
    }


    // add in Urban Growth Boundary (2018)
    window.parseResponseUGB = function(data) {
      boundaries.addBaseLayer({
          group: "Boundary lines", //note: this is not working yet
		       name:  'UGB (2018)',
	           layer: L.geoJson(data, {
               id: 'ind',
               style: border_style,
               interactive: false
          })
        });
      UpdateIndicatorList();
    }


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
    $('leaflet-control-search leaflet-control').attr('data-step', "3")
    $('leaflet-control-search leaflet-control').attr('data-intro', "Search for a suburb here to locate and display its summary information for all indicators.")
    $('#sa1_overlay').attr('data-step', '4');
    $('#sa1_overlay').attr('data-intro', 'The currently selected map is displayed here --- the Liveability Index, for SA1 areas (an ABS definition, like a local neighbourhood).  If you hover over one of the highlighted areas its value for this indicator will displayed here.  Click on an area for more detail.');
    // $('#info_overlay').attr('data-step', '5');
    // $('#info_overlay').attr('data-intro', 'Summary information can be retrieved either at the SA1 or Suburb level');
    // $('#bmap_overlay').attr('data-step', '6');
    // $('#bmap_overlay').attr('data-intro', 'The background map can be toggled between a basic gray scale map, or a satellite view.  The latter may be useful to examine local built environment in light of the displayed indicators.');
    // $('a.leaflet-control-layers-toggle').attr('data-step', '7');
    // $('a.leaflet-control-layers-toggle').attr('data-intro', 'The displayed map elements summarised above can be changed here; hover over this icon to display the options.  For example, you could select to view the "Walkability Index" at the suburb level.');


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
        url: "/account/logout/",
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
