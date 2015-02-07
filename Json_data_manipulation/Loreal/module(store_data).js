// Variable Global
var csAd = {};
// JSON data
var storeData = [{
                  "store_id": "store_two",
                  "locations": { "latitude": 33.982539, "longitude": -118.091727 }
                  }, {
                  "store_id": "store_three",
                  "locations": { "latitude": 40.733448, "longitude": -73.987837 }
                  }, {
                  "store_id": "store_one",
                  "locations": { "latitude": 33.987318, "longitude": -118.47252 }
                  }];

// Window Load
window.onload = function() {
  // Set Up for the expanded Size without using the Studio Settings
  // Can be also use as Multi-Directional Expand
  Enabler.setExpandingPixelOffsets(0, 0,320,480);

  // Check if the Enabler is Iniatialized
  if (Enabler.isInitialized()) {
    // Begin show ad
    enablerInitHandler();
  } else {
    // Manually show ad
    Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
  }
}
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
function onYouTubeIframeAPIReady() {
  csAd.player_exp = new YT.Player('player_exp', {
    height: '177',
    width: '292',
    videoId: 'K7OkKp4lLg0',
    events: {
      'onReady': onPlayerReady
    }
  });
}
// The API will call this function when the video player is ready.
function onPlayerReady(event) {}

// Enabler Initialize Handler
function enablerInitHandler() {
  // Distance Array
  csAd.distance = new Array();
  // Geo-location code to track the user possition
  navigator.geolocation.getCurrentPosition(function(position) {
    // Allow user to get the position
      csAd.user_lat = position.coords.latitude,
      csAd.user_lon = position.coords.longitude;
      for(var i = 0; i < storeData.length; i++){
      var result_test = getDistance(csAd.user_lat, csAd.user_lon, storeData[i].locations.latitude, storeData[i].locations.longitude);
        csAd.distance.push(result_test);
        //console.log(storeData[i].locations.latitude);
        //console.log(storeData[i].locations.longitude);    
    }
    // Flag if Allow or Deny
    csAd.allowed = true;
      availableText();
    }, function() {
      // Deny user to get the positon
      // Flag if Allow or Deny
    csAd.allowed = false;
      availableText();
    }
    );

  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Assign Variable
  csAd.text1_scene_col    = document.getElementById('text1_scene_col');
  csAd.text2_scene_col    = document.getElementById('text2_scene_col');
  csAd.text3_scene_col    = document.getElementById('text3_scene_col');
  csAd.logo_col       = document.getElementById('logo_col');
  csAd.divide_col       = document.getElementById('divide_col');
  csAd.bg_col         = document.getElementById('bg_col');
  csAd.product_col      = document.getElementById('product_col');
  csAd.collapse_container   = document.getElementById('collapse_container');
  csAd.expand_container     = document.getElementById('expand_container');
  csAd.text4_scene_col    = document.getElementById('text4_scene_col');
  csAd.text5_scene_col    = document.getElementById('text5_scene_col');

  // Embed Image
  csAd.logo_col.style.background      = "url('logo_col.png')";
  csAd.logo_col.style.backgroundSize    = "94px 40px";
  csAd.logo_col.style.width         = "94px";
  csAd.logo_col.style.height        = "40px";

  csAd.product_col.style.background     = "url('product_col.png')";
  csAd.product_col.style.backgroundSize   = "38px 61px";
  csAd.product_col.style.width      = "38px";
  csAd.product_col.style.height         = "61px";

  csAd.divide_col.style.background    = "url('shape_col.png')";
  csAd.divide_col.style.backgroundSize  = "1px 12px";
  csAd.divide_col.style.width       = "1px";
  csAd.divide_col.style.height      = "12px";

  csAd.bg_col.style.background      = "url('bg_col.jpg')";
  csAd.bg_col.style.backgroundSize    = "320px 50px";
  csAd.bg_col.style.width         = "320px";
  csAd.bg_col.style.height          = "50px";
  // Preload Function
  // Image Array
  csAd.images_col = new Array()
  function preload_col() {
    for (i = 0; i < preload_col.arguments.length; i++) {
      csAd.images_col[i]    = new Image()
      csAd.images_col[i].src  = preload_col.arguments[i]
    }
    csAd.images_col[3].addEventListener('load', preloadedCollapse);
  }
  // Putting all the argument and pass to the function
  preload_col( "logo_col.png", "product_col.png", "shape_col.png", "bg_col.jpg" )

  function preloadedCollapse() {
    csAd.collapse_container.style.display = "block";

    //Event Listener
    csAd.collapse_container.addEventListener('click', function(){
      tracking('special', 0);
    }, false);

    Enabler.addEventListener(studio.events.StudioEvent.EXPAND_START, expandHandler);
    Enabler.addEventListener(studio.events.StudioEvent.COLLAPSE_START, collapseHandler);

    // Animation
    setTimeout(animate_col, 300);

    function animate_col() {
      csAd.product_col.className  += " fade-right-product_col";
      csAd.logo_col.className   += " fade-in-logo_col";
      setTimeout(function(){
        csAd.text1_scene_col.className += " fade-left-text1_col-text2_col-text3_col";
        setTimeout(function(){
          csAd.text2_scene_col.className += " fade-left-text1_col-text2_col-text3_col";
          setTimeout(function(){
            csAd.text3_scene_col.className += " fade-left-text1_col-text2_col-text3_col";
          }, 400)
        },400);
      },400);
    }
  }

  function availableText() {
    setTimeout(function() {
        csAd.text5_scene_col.className  += " fade-in-text4_col-divide_col-tex5_col";
        csAd.text4_scene_col.className  += " fade-in-text4_col-divide_col-tex5_col";
        csAd.divide_col.className   += " fade-in-text4_col-divide_col-tex5_col";
        if (Math.min(csAd.distance).length <=7 ){
          csAd.text5_scene_col.style.fontSize = '7px';
          csAd.text5_scene_col.style.top    = '35.3px';
        }
        console.log('List of Array: ', csAd.distance)
        console.log('Lowest Value: ', Array.min(csAd.distance), ' Index Of', indexOfSmallest(csAd.distance) );
        indexOfSmallest(csAd.distance);
        if (!csAd.allowed){
          csAd.text5_scene_col.innerHTML = "No Available";
        } else {
          csAd.text5_scene_col.innerHTML = Array.min(csAd.distance) + " Miles Away";
        }
      }, 500);
  }
}
// Array get smallest value
Array.min = function(array){ 
  return Math.min.apply( Math, array ); 
};
function indexOfSmallest(array) {
  return array.indexOf(Array.min(array).toString());
}
// Degrees to Radius
function degRad (deg) {
  var rad = deg*Math.PI/180;
  return rad;
}
// Get Distance
function getDistance (lon1, lat1, lon2, lat2) {
  // Distance between the longitude
  var dlon = degRad(lon2) - degRad(lon1);
  // Diatance between the latitude
  var dlat = degRad(lat2) - degRad(lat1);
  var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = c * 3961;
  return d.toFixed(2);
}
// Expansion Handler
function expandHandler() {
  csAd.collapse_container.style.display = 'none';
  csAd.expand_container.style.display = 'block';

  // Variable
  csAd.text1_scene_frame1_exp  = document.getElementById('text1_scene_frame1_exp'),
  csAd.text2_scene_frame1_exp  = document.getElementById('text2_scene_frame1_exp'),
  csAd.text3_scene_frame1_exp  = document.getElementById('text3_scene_frame1_exp'),
  csAd.text4_scene_frame1_exp  = document.getElementById('text4_scene_frame1_exp'),
  csAd.text5_scene_frame1_exp  = document.getElementById('text5_scene_frame1_exp'),
  csAd.text6_scene_frame1_exp  = document.getElementById('text6_scene_frame1_exp'),
  csAd.text7_scene_frame1_exp  = document.getElementById('text7_scene_frame1_exp'),
  csAd.arrow_frame1_exp      = document.getElementById('arrow_frame1_exp'),
  csAd.logo_frame1_exp     = document.getElementById('logo_frame1_exp'),
  csAd.product_frame1_exp    = document.getElementById('product_frame1_exp'),
  csAd.arrow_frame1_exp    = document.getElementById('arrow_frame1_exp'),
  csAd.bg_frame1_exp       = document.getElementById('bg_frame1_exp'),
  csAd.bg_frame2_exp       = document.getElementById('bg_frame2_exp'),
  csAd.container_frame2_exp  = document.getElementById('container_frame2_exp'),
  csAd.close_button_frame1_exp = document.getElementById('close_button_frame1_exp'),
  csAd.close_button_frame2_exp = document.getElementById('close_button_frame2_exp'),
  csAd.curtain_exp       = document.getElementById('curtain_exp'),
  csAd.map_canvas_exp      = document.getElementById('map_canvas_exp'),
  csAd.upper_exp         = document.getElementById('upper_exp'),
  csAd.lower_exp         = document.getElementById('lower_exp'),
  csAd.logo_frame2_exp     = document.getElementById('logo_frame2_exp'),
  csAd.dot_frame2_exp      = document.getElementById('dot_frame2_exp'),
  csAd.text1_scene_frame2_exp  = document.getElementById('text1_scene_frame2_exp'),
  csAd.text2_scene_frame2_exp  = document.getElementById('text2_scene_frame2_exp'),
  csAd.text3_scene_frame2_exp  = document.getElementById('text3_scene_frame2_exp'),
  csAd.text4_scene_frame2_exp  = document.getElementById('text4_scene_frame2_exp'),
  csAd.text5_scene_frame2_exp  = document.getElementById('text5_scene_frame2_exp'),
  csAd.vid_shine_frame1_exp  = document.getElementById('vid_shine_frame1_exp'),
  csAd.low_bg_frame1_exp     = document.getElementById('low_bg_frame1_exp'),
  csAd.product_frame1_exp    = document.getElementById('product_frame1_exp'),
  csAd.shade_red         = document.getElementById('shade_red'),
  csAd.exit_btn        = document.getElementById('exit_btn'),
  csAd.player          = document.getElementById('ytplayer');

  // Initiation of Google Map
  initialize();
  
  function initialize() {
    // Setting the Latitude and Longitude
    csAd.myLatLng   = new google.maps.LatLng(33.987318, -118.47252);
    // Google Map set-up
    var map_options  = {
        center: csAd.myLatLng,
        zoom: 8,
        styles: [{"stylers":[{"hue":"#ff1a00"},{"invert_lightness":true},
        {"saturation":-100},{"lightness":33},{"gamma":0.5}]},
        {"featureType":"water","elementType":"geometry",
        "stylers":[{"color":"#2D333C"}]}]
      }

    csAd.map    = new google.maps.Map(map_canvas_exp, map_options);
    var marker = new MarkerWithLabel({
        position: csAd.myLatLng,
    });
    // Center to a Specific marker
    csAd.marker_position = marker.getPosition(); // returns LatLng object
  }

  // Add Marker
  function addMarker () {
    var image   = 'marker.png';
    var marker = new MarkerWithLabel({
        position: csAd.myLatLng,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 0, //tamaño 0
        },
        map: csAd.map,
        labelClass: "marker-animation", // the CSS class for the label
    });
  }

  // Embed Image
  csAd.logo_frame1_exp.style.background       = "url('logo_exp.png')";
  csAd.logo_frame1_exp.style.backgroundSize     = "82px 22px";
  csAd.logo_frame1_exp.style.width        = "82px";
  csAd.logo_frame1_exp.style.height         = "22px";

  csAd.product_frame1_exp.style.background    = "url('product_exp.png')";
  csAd.product_frame1_exp.style.backgroundSize  = "191px 168px";
  csAd.product_frame1_exp.style.width       = "191px";
  csAd.product_frame1_exp.style.height      = "168px";

  csAd.arrow_frame1_exp.style.background      = "url('shape_exp.png')";
  csAd.arrow_frame1_exp.style.backgroundSize    = "5px 9px";
  csAd.arrow_frame1_exp.style.width         = "5px";
  csAd.arrow_frame1_exp.style.height        = "9px";

  csAd.bg_frame1_exp.style.background       = "url('loreal_bg_exp.jpg')";
  csAd.bg_frame1_exp.style.backgroundSize     = "320px 480px";
  csAd.bg_frame1_exp.style.width          = "320px";
  csAd.bg_frame1_exp.style.height         = "480px";

  csAd.logo_frame2_exp.style.background       = "url('logo_exp.png')";
  csAd.logo_frame2_exp.style.backgroundSize     = "82px 22px";
  csAd.logo_frame2_exp.style.width        = "82px";
  csAd.logo_frame2_exp.style.height         = "22px";

  csAd.dot_frame2_exp.style.background      = "url('dot_exp.png')";
  csAd.dot_frame2_exp.style.backgroundSize      = "8px 8px";
  csAd.dot_frame2_exp.style.width         = "8px";
  csAd.dot_frame2_exp.style.height        = "8px";

  csAd.shade_red.style.background         = "url('glow.png')";
  csAd.shade_red.style.backgroundSize       = "96px 207px";
  csAd.shade_red.style.width            = "96px";
  csAd.shade_red.style.height           = "207px";

  csAd.vid_shine_frame1_exp.style.background    = "url('vid_shine.png')";
  csAd.vid_shine_frame1_exp.style.backgroundSize  = "140px 408px";
  csAd.vid_shine_frame1_exp.style.width       = "140px";
  csAd.vid_shine_frame1_exp.style.height      = "408px";

  csAd.low_bg_frame1_exp.style.background     = "url('product_shine.png')";
  csAd.low_bg_frame1_exp.style.backgroundSize   = "80px 189px";
  csAd.low_bg_frame1_exp.style.width        = "80px";
  csAd.low_bg_frame1_exp.style.height       = "189px";

  // Preload Function
  // Image Array
  csAd.images_exp = new Array();
  function preload_exp() {
    for (i = 0; i < preload_exp.arguments.length; i++) {
      csAd.images_exp[i]    = new Image()
      csAd.images_exp[i].src  = preload_exp.arguments[i]
    }
    csAd.images_exp[6].addEventListener('load', preloadedExpand);
  }
  // Putting all the argument and pass to the function
  preload_exp( "glow.png", "logo_exp.png", "product_exp.png", "shape_exp.png",
    "logo_exp.png", "dot_exp.png", "loreal_bg_exp.jpg", "vid_shine.png",
    "product_shine.png" )

  function preloadedExpand() {
    expandInitiate();

    function expandInitiate() {
      // Timer Variable
      var timer1, timer2, timer3, timer4, timer5, timer6, timer7, timer8,
        timer9, timer10;
      // Animation Frame One
      animateFrame1();

      function animateFrame1() {
        csAd.curtain_exp.className      += " fade-out-curtain_exp";
        csAd.bg_frame1_exp.className    += " fade-in-bg_exp"
        timer1 = setTimeout(function() {
          csAd.curtain_exp.style.display = "none";
          csAd.product_frame1_exp.className += " fade-right-product_exp";
          csAd.low_bg_frame1_exp.className  += " fade-right_low_bg"
          timer2 = setTimeout(function(){
            csAd.text1_scene_frame1_exp.className += " fade-down-text1_exp";
            timer3 = setTimeout(function(){
              csAd.text2_scene_frame1_exp.className += " fade-down-text2_exp";
              timer4 = setTimeout(function(){
                csAd.text3_scene_frame1_exp.className += " fade-down-text3_exp";
                timer5 = setTimeout(function(){
                  csAd.text5_scene_frame1_exp.className += " fade-text5-text6-text7_exp";
                  csAd.text6_scene_frame1_exp.className += " fade-text5-text6-text7_exp";
                  csAd.text7_scene_frame1_exp.className += " fade-text5-text6-text7_exp";
                  timer6 = setTimeout(function() {
                    csAd.arrow_frame1_exp.className     += " fade-up-arrow_exp";
                    csAd.text4_scene_frame1_exp.className += " fade-up-text4_exp";
                  }, 300)
                }, 300)
              }, 300)
            },300);
          },300);
        }, 1100)
      }

      csAd.exit_btn.addEventListener('click', function() {
        reset();
        csAd.player_exp.stopVideo();
          tracking('exit', 0);
          tracking('special', 1);
      });

      //Event Listener
      csAd.text4_scene_frame1_exp.addEventListener('click', function() {
          csAd.container_frame2_exp.style.display = "block";
          // Fix to render map completely
        google.maps.event.trigger(csAd.map, 'resize');
          csAd.map.setZoom(csAd.map.getZoom());

          csAd.map.setCenter(csAd.marker_position);

          csAd.player_exp.stopVideo();
          animateFrame2();
      });

      csAd.close_button_frame1_exp.addEventListener('click', function() {
        reset();
          tracking('special', 2);
          tracking('special', 1);
      });

      csAd.close_button_frame2_exp.addEventListener('click', function() {
        reset();
        tracking('special', 2);
          tracking('special', 1);
      });

      // Animation Frame Two
      function animateFrame2() {
        timer7 = setTimeout(function() {
          csAd.bg_frame2_exp.className += " fade-out-bg_exp";
          timer8 = setTimeout(function() {
            csAd.bg_frame2_exp.style.display = 'none';
            csAd.upper_exp.className += " fade-up-bg_exp";
            csAd.lower_exp.className += " fade-down-bg_exp";
            timer9 = setTimeout(function() {
              csAd.text1_scene_frame2_exp.className   += " fade-in-logo_exp";
              csAd.text2_scene_frame2_exp.className   += " fade-in-logo_exp";
              csAd.text3_scene_frame2_exp.className   += " fade-in-logo_exp";
              csAd.text4_scene_frame2_exp.className   += " fade-in-logo_exp";
              csAd.text5_scene_frame2_exp.className   += " fade-in-logo_exp";
              csAd.shade_red.className        += " fade-in-logo_exp";
              csAd.dot_frame2_exp.className     += " fade-in-logo_exp";
              csAd.logo_frame2_exp.className      += " fade-in-logo_exp";
              addMarker();
              var result = getDistance(csAd.user_lat, csAd.user_lon, 33.987318, -118.47252);
              if (result.length <=7 ){
                  csAd.text5_scene_frame2_exp.style.left = '208px';
                }
                if (isNaN(result)){
                  csAd.text5_scene_frame2_exp.innerHTML = "No Available";
                } else {
                  csAd.text5_scene_frame2_exp.innerHTML = result + " Miles Away";
                }
            },1600)
          },1100)
        }, 500)
      }

      // Reset Animation
      function reset() {
        csAd.curtain_exp.className        = '';
        csAd.curtain_exp.style.display      = "block";
        csAd.product_frame1_exp.className     = '';
        csAd.text1_scene_frame1_exp.className   = '';
        csAd.text2_scene_frame1_exp.className   = '';
        csAd.text3_scene_frame1_exp.className   = '';
        csAd.text5_scene_frame1_exp.className   = '';
        csAd.text6_scene_frame1_exp.className   = '';
        csAd.text7_scene_frame1_exp.className   = '';
        csAd.arrow_frame1_exp.className     = '';
        csAd.text4_scene_frame1_exp.className   = '';
        csAd.container_frame2_exp.style.display = "none";
        csAd.bg_frame2_exp.className      = '';
        csAd.bg_frame2_exp.style.display    = 'block';
        csAd.upper_exp.className        = '';
        csAd.lower_exp.className        = '';
        csAd.text1_scene_frame2_exp.className   = '';
        csAd.text2_scene_frame2_exp.className   = '';
        csAd.text3_scene_frame2_exp.className   = '';
        csAd.text4_scene_frame2_exp.className   = '';
        csAd.text5_scene_frame2_exp.className   = '';
        csAd.shade_red.className        = '';
        csAd.dot_frame2_exp.className     = '';
        csAd.logo_frame2_exp.className      = '';
        csAd.bg_frame1_exp.className      = '';
        csAd.low_bg_frame1_exp.className      = '';
        clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3);
        clearTimeout(timer4); clearTimeout(timer5); clearTimeout(timer6);
        clearTimeout(timer7); clearTimeout(timer8); clearTimeout(timer9);
        clearTimeout(timer10);
      }
    };
  }
  Enabler.finishExpand();
};
// Collapse Handler
function collapseHandler() {
  csAd.collapse_container.style.display = 'block';
  csAd.expand_container.style.display = 'none';
  csAd.player_exp.stopVideo();
  Enabler.finishCollapse();
};

tracking = function(id, pos) {
  switch(id) {
    case 'exit':
      switch(pos) {
        case 0: Enabler.exit('Test Exit'); break;
      }
    break;
    case 'counter':
      switch(pos) {
        case 0: Enabler.counter('Test Counter'); break;
      }
    break;
    case 'special':
      switch(pos) {
        case 0: Enabler.requestExpand(); break;
        case 1: Enabler.requestCollapse(); break;
        case 2: Enabler.reportManualClose(); break;
        case 3: Enabler.finishExpand(); break;
        case 4: Enabler.finishCollapse(); break;
      }
    break;
  }
}