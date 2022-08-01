// ALL MAIN MAP FUNCTIONS ARE IN THIS FILE
//JORDAN MILLS 2022
//IMPORT FILES
import {
  defaultMap,
  terrainMap,
  satelliteMap,
  trafficMap,
  overlayMaps,
} from "./maptiles.js";

//PLACES OF INTEREST MARKERS WITH WIKI DATA (location is the end URL string from wiki, use %20 for spaces)
const getWiki = (location) => {
  //GET WIKI DATA FOR MARKERS (getWiki.php)
  $.ajax({
    url: "resources/php/getWiki.php",
    type: "POST",
    dataType: "json",
    data: {
      location: location,
    },

    success: function (result) {
      if (result.status.name == "ok") {
        //GET WIKI DATA
        //GET PAGE ID (USED FOR ARTICLE LINK)
        const wikiPageID = Object.keys(
          result["data"]["query"]["pages"]
        ).toString();
        //this returns the "title" and "extract" data
        const wikiAttributes = Object.values(result["data"]["query"]["pages"]);
        const wikiTitle = wikiAttributes[0]["title"];
        const wikiExtract = wikiAttributes[0]["extract"];

        //populate html
        $("#wikiTitle").html(wikiTitle);
        $("#wikiExtract").html(wikiExtract);
        $("#articleLink").attr(
          "href",
          "https://en.wikipedia.org/?curid=" + wikiPageID
        );
        $.ajax({
          url: "resources/php/getWikiImage.php",
          type: "POST",
          dataType: "json",
          data: {
            location: location,
          },
          success: function (result) {
            if (result.status.name == "ok") {
              //get wiki img source
              const wikiImage = Object.values(result["data"]["query"]["pages"]);
              const wikiImageSource = wikiImage[0]["thumbnail"]["source"];
              const wikiImageAlt = wikiImage[0]["title"];
              //console.log(wikiImageSource);
              //console.log(wikiImageAlt);

              //populate html with image source
              $("#wikiImg").attr("src", wikiImageSource);
              //populate html with alt text
              $("#wikiImg").attr("alt", wikiImageAlt);
            } //end of if 2nd ajax
          }, //end of success 2nd ajax
        }); //end of 2nd ajax
      } // end of if 1st ajax
    }, //end of success 1st ajax
  }); //end of ajax
}; //end of getWiki function

//create custom icon forplaces of interest
var placesIcon = L.icon({
  iconUrl: "resources/img/capital-city-icon.png",
  //shadowUrl: "resources/img/capital-city-icon-shadow.png",

  iconSize: [40, 40], // size of the icon
  //shadowSize: [48, 48], // size of the shadow
  iconAnchor: [30, 30], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-10, -35], // point from which the popup should open relative to the iconAnchor
});

//define places of interest
var placesOfInterest = L.layerGroup();

//add places of interest markers to layer
var bigBenUK = L.marker([51.5007, -0.1246], { icon: placesIcon })
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Big%20Ben");
  });

var eiffelTowerFR = L.marker([48.8584, 2.2945], { icon: placesIcon })
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Eiffel%20Tower");
  });

var palaceOfMadridES = L.marker([40.418, -3.7143], { icon: placesIcon })
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Royal%20Palace%20of%20Madrid");
  });

var colosseumIT = L.marker([41.8902, 12.4922], { icon: placesIcon })
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Colosseum");
  });

var brandenburgGateDE = L.marker([52.5163, 13.3777], {
  icon: placesIcon,
})
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Brandenburg%20Gate");
  });

var acropolisOfAthensGR = L.marker([37.9715, 23.7257], {
  icon: placesIcon,
})
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Acropolis%20of%20Athens");
  });

var lisbonCathedralPT = L.marker([38.7099, -9.1326], {
  icon: placesIcon,
})
  .addTo(placesOfInterest)
  .on("click", () => {
    getWiki("Lisbon%20Cathedral");
  });

//bind info to markers from getWiki.php
bigBenUK.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

eiffelTowerFR.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

palaceOfMadridES.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

colosseumIT.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

brandenburgGateDE.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

acropolisOfAthensGR.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

lisbonCathedralPT.bindPopup(
  "<h3 id='wikiTitle'></h3><hr><img id='wikiImg'><br><p id='wikiExtract'</p><hr><img id='wiki' src='./resources/img/wiki-icon.png' alt='Wikipedia Icon'><br><a id='articleLink'>Read full article</a>"
);

//-- END OF WIKI API //

// MAP SETTINGS //
//Initialise map
//(zoom control false to allow movement of controls elsewhere)
//min zoom set so map doesnt go out of bounds
// (change zoom level to 12 when development complete)
//(LAT, LONG, ZOOM LEVEL) - start location is current location (inaccurate for desktop)
var map = L.map("map", {
  layers: [defaultMap, terrainMap, satelliteMap, trafficMap, placesOfInterest],
  zoomControl: false,
  minZoom: 3,
}).fitWorld();

//use navigator geolocation to find location
//Assign coords to variables
const successCallback = (position) => {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  //console.log("success function called");
  //CURRENT LOCATION POPUP
  L.popup({ maxHeight: 200 })
    .setLatLng([lat, lng])
    .setContent(
      "<img class='mapclick' src='./resources/img/current-location-icon.png'><h4>Your current location.</h4><hr><ul><li>Click <strong>anywhere</strong> on the map to get data.</li><li>Click on the layers button to display different maps.</li><li>Check out places of interest (star button).</li><li>Toggle the sidebar using the sidebar button. </li></ul>"
    )
    .openOn(map);
};

const errorCallback = (err) => {
  console.log(err);
};

//call navigator geolocation
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

//stop map being dragged out of bounds
var southWest = L.latLng(-89.98155760646617, -180),
  northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);

map.setMaxBounds(bounds);
map.on("drag", function () {
  map.panInsideBounds(bounds, { animate: false });
});

//reposition zoom controls to top right
L.control
  .zoom({
    position: "topright",
  })
  .addTo(map);

//add layer control button (shows map types)
L.control.layers(overlayMaps).addTo(map);

//ADD custom easy button for places of interest
//This easy button toggles markers on/off the map
var togglePlacesOfInterest = L.easyButton({
  states: [
    {
      icon: '<img src="resources/img/star-icon.png">',
      stateName: "remove-markers",
      onClick: function (control) {
        map.removeLayer(placesOfInterest);
        control.state("add-markers");
      },
      title: "Hide places of interest",
    },
    {
      stateName: "add-markers",
      icon: '<img src="resources/img/star-icon-disabled.png">',
      title: "Show places of interest",
      onClick: function (control) {
        map.addLayer(placesOfInterest);
        control.state("remove-markers");
      },
    },
  ],
}).setPosition("topright");
togglePlacesOfInterest.addTo(map);

//ADD custom easy button for sidebar
//This easy button toggles the sidebar on/off
var toggleSidebar = L.easyButton({
  states: [
    {
      icon: '<img src="resources/img/sidebar-icon.png">',
      stateName: "hide-sidebar",
      onClick: function (control) {
        /* MOVES NAV BAR TO FULL WIDTH WHEN SIDEBAR CLOSES */
        $("#sidebar").slideToggle(500);
        $("#newsWindow").css({ left: "0px", width: "100%" });
        control.state("show-sidebar");
      },
      title: "Hide sidebar",
    },
    {
      stateName: "show-sidebar",
      icon: '<img src="resources/img/sidebar-icon-disabled.png">',
      title: "Show sidebar",
      onClick: function (control) {
        $("#sidebar").slideToggle(500);
        /* RESETS TO DEFAULT CSS FOR NEWS */
        $("#newsWindow").css({ left: "220px", width: "calc(100% - 220px)" });
        control.state("hide-sidebar");
      },
    },
  ],
}).setPosition("topright");
toggleSidebar.addTo(map);

//add distance scale to map (bottom left of map)
L.control.scale().addTo(map);

// -- END OF MAP SETTINGS -- //

//GET COUNTRIES SELECT LIST (USING getCountryBorders.php)
$.ajax({
  url: "resources/php/getCountryBorders.php",
  type: "POST",
  dataType: "json",

  success: function (result) {
    if (result.status.name == "ok") {
      // loop through data and append country to select option menu in nav (175 results returned)
      for (var i = 0; i < result.data.border.features.length; i++) {
        $("#selectCountry").append(
          $("<option>", {
            value: result.data.border.features[i].properties.iso_a3,
            text: result.data.border.features[i].properties.name,
          })
        );
      }
    }
    //sort options alphabetically using localeCompare
    $("#selectCountry").html(
      $("#selectCountry option").sort((a, b) => a.text.localeCompare(b.text))
    );
  },
});

//-- END OF SELECT OPTIONS --//

//COUNTRY INFO ONCLICK FUNCTIONALITY
//display borders on map when nav button is clicked (onclick)
$("#getCountryInfo").on("click", function () {
  //get selected value from option menu (assigned with getCountryBorders.php)
  let countryCode = $("#selectCountry").val();
  //clear news errors from prev search
  $("#newsError").html("");

  $.ajax({
    url: "resources/php/getCountryBorders.php",
    type: "POST",
    dataType: "json",
    success: function (result) {
      /* NOT WORKING (UNDEFINED VAR)
      if (map.hasLayer(countryBorder)) {
        console.log(countryBorder);
        map.removeLayer(countryBorder);
      }
      */
      //create empty array to push data to
      let countryCodeArr = [];

      //loop through json countries list, when isoa3 matches country code, push to array
      for (let i = 0; i < result.data.border.features.length; i++) {
        if (result.data.border.features[i].properties.iso_a3 === countryCode) {
          countryCodeArr.push(result.data.border.features[i]);
        }
      }

      //define selected country border with geoJSON
      let countryBorder = L.geoJSON(countryCodeArr[0], {
        color: "#ff0000",
        weight: 3,
        opacity: 0.75,
      }).addTo(map);

      //move map position to selected country
      let moveMap = countryBorder.getBounds();
      map.flyToBounds(moveMap, {
        duration: 3,
      });
    },
  });

  //GET COUNTRY DATA API
  $.ajax({
    url: "resources/php/getCountryData.php",
    type: "POST",
    dataType: "json",
    data: {
      countryCode: countryCode,
    },
    success: function (result) {
      if (result.status.name == "ok") {
        //force toggle to open if closed by user BEFORE displaying results
        $(".sidebar-toggle").slideDown(500);

        //GET CURRENCY RELATED DATA
        const currencyCodeName = Object.keys(result["data"][0]["currencies"]);
        //this returns the "name" and "symbol" data for the currency
        const currencyAttributes = Object.values(
          result["data"][0]["currencies"]
        );

        //this is to be used by getExchangeRates.php
        const currencyCode = currencyCodeName[0];
        //this is to be used by getNews.php
        const newsCountryCode = result["data"][0]["cca2"];
        const countryName = result["data"][0]["name"]["common"];

        //this separates the "name" and "symbol" values
        const currencyName = currencyAttributes[0]["name"];
        const currencySymbol = currencyAttributes[0]["symbol"];

        //INSERT DATA INTO SIDEBAR
        $("#countryName").html(result["data"][0]["name"]["common"]);
        $("#countryCodeA2").html(result["data"][0]["cca2"]);
        $("#countryCodeA3").html(result["data"][0]["cca3"]);
        $("#countryCodeN3").html(result["data"][0]["ccn3"]);
        $("#capitalCity").html(result["data"][0]["capital"]);
        $("#area").html(result["data"][0]["area"]);
        $("#currencyCode").html(currencyCodeName[0]);
        $("#currencyName").html(currencyName);
        $("#currencySymbol").html(currencySymbol);

        //get exchange rates data API (USD to selected country only as its free version)
        $.ajax({
          url: "resources/php/getExchangeRates.php",
          type: "POST",
          dataType: "json",
          success: function (result) {
            if (result.status.name == "ok") {
              $("#exchangeRates").html(
                "1 " +
                  currencyName +
                  " is equal to " +
                  result["data"]["rates"][currencyCode] +
                  " USD."
              );
            } //end of if success 2nd ajax
          }, //end of success function 2nd ajax
        }); //end of 2nd ajax

        //get news API
        $.ajax({
          url: "resources/php/getNews.php",
          type: "GET",
          dataType: "json",
          data: {
            countryCode: newsCountryCode,
          },
          success: function (result) {
            if (result.status.name == "ok") {
              //display news window
              //MAKE NEWS WINDOW VISIBLE
              $("#newsWindow").css("visibility", "visible");
              $("#newsWindow").fadeIn(1000);

              //display 20 articles
              for (let i = 0; i < 20; i++) {
                let results = result["data"]["articles"][i];
                //if no news for country
                if (!results) {
                  //clear news data from prev search
                  $("#newsResults").html("");
                  //add news error
                  $("#newsError").html(
                    "There is no news available for " +
                      countryName +
                      ". Note: We only currently display news for larger countries. Try Belgium, United Kingdom, Australia etc."
                  );
                  $("#newsTitle").html("Latest news for " + countryName);
                } else {
                  //clear news error from prev search
                  $("#newsError").html("");
                  $("#newsResults").append(
                    "<h4>" +
                      results["title"] +
                      "</h4>" +
                      results["content"] +
                      "<br>" +
                      "<a href=" +
                      results["url"] +
                      ">" +
                      results["url"] +
                      "</a>" +
                      "<br>" +
                      "<p>" +
                      "Published By: " +
                      results["author"] +
                      "</p>" +
                      "<hr>"
                  );
                  $("#newsTitle").html("Latest news for " + countryName);
                } //end of else block 3rd ajax
              } //end of for block 3rd ajax
            } //end of if success 3rd ajax
          }, //end of success function 3rd ajax
        }); //end of 3rd ajax

        //get country flags (reusing newscountry code as its the same )
        $.ajax({
          url: "resources/php/getCountryFlagImage.php",
          type: "GET",
          dataType: "html",
          data: {
            countryCode: newsCountryCode,
          },
          success: function (result) {
            //get data
            const countryFlag = result;
            //populate html with image source
            $("#countryFlag").html(countryFlag);
            /* resize svg viewbox
            $("svg").removeAttr("viewBox");
            $("svg").each(function () {
              $(this)[0].setAttribute("viewBox", "0 0 600 300"); 
            }); */
          }, //end of success function 4th ajax
        }); //end of 4th ajax
      } //end of if result ok 1st ajax
    }, //end of success function 1st ajax
  }); //end of 1st ajax
}); //end of onclick function

//-- END OF MAP BORDERS AND API CALLS --//

// API CALLS FOR onMapClick  (located in ../php/onclick)
//get lat/lng for map click at any location
const onMapClick = (e) => {
  //separate lat/lng values from latlng (round to 3dp)
  const lat = e.latlng.lat.toFixed(3);
  const lng = e.latlng.lng.toFixed(3);

  //define popup to display data
  var coords = L.popup()
    .setLatLng(e.latlng)
    .setContent(
      "<img class='mapclick' src='./resources/img/current-location-icon.png'><h3>Current Position</h3>Latitude: " +
        lat +
        "<br>Longitude: " +
        lng +
        "<hr><img class='mapclick' src='./resources/img/sunrise-sunset-icon.png'><h3>Sunrise/Sunset</h3><div id='timezoneError'></div><div class='timezoneData'>Sunrise: <span id='sunrise'></span></div><div class='timezoneData'>Sunset: <span id='sunset'></span></div><hr><img class='mapclick' src='./resources/img/elevation-icon.png'><h3>Elevation</h3><img src='./resources/img/elevation-scale.png'><div id='elevationError'></div><div class='elevationData'><span id='elevation'></span></div><hr><img class='mapclick' src='./resources/img/weather-icon.png'><h3>Weather</h3><div id='weatherError'></div><div class='weatherData'><span id='temperature'></span><br><span id='humidity'></span><br><span id='dewpoint'></span><br><span id='pressure'></span><br><span id='clouds'></span><br><span id='windSpeed'></span><br><span id='windDirection'></span><br></div>"
    );

  //get sunrise/sunset data from API
  $.ajax({
    url: "resources/php/onclick/getSunriseSunset.php",
    type: "POST",
    dataType: "json",
    //get lat/lng data directly from above variables
    data: {
      lat: lat,
      lng: lng,
    },
    success: function (result) {
      if (result.status.name == "ok") {
        //remove error message if result (if exists)
        document.getElementById("timezoneError").style.visibility = "hidden";
        //make new results visible again
        const showNew = document.getElementsByClassName("timezoneData");
        if (showNew) {
          for (let i = 0; i < showNew.length; i++) {
            showNew[i].style.visibility = "visible";
          }
        }
        //INSERT DATA TO HTML
        //data is being called successfully
        //console.log(result["data"]["sunrise"]);
        //not updating after 1st call, DEBUG THIS (updates if popup is closed and opens again)
        $("#sunrise").html(result["data"]["sunrise"]);
        $("#sunset").html(result["data"]["sunset"]);

        //IF NO RESULT FOR sunrise
        if (!result["data"]["sunrise"]) {
          document.getElementById("timezoneError").style.visibility = "visible";
          $("#timezoneError").html(
            "No sunrise/sunset data at these co-ordinates."
          );
          //hide prev results if NO DATA
          const hidePrev = document.getElementsByClassName("timezoneData");
          if (hidePrev) {
            for (let i = 0; i < hidePrev.length; i++) {
              hidePrev[i].style.visibility = "hidden";
            }
          }
        }
      }
    },
  });

  //get elevation data from API
  $.ajax({
    url: "resources/php/onclick/getElevation.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: lat,
      lng: lng,
    },
    success: function (result) {
      //console.log(JSON.stringify(result));
      if (result.status.name == "ok") {
        //remove error message if result
        document.getElementById("elevationError").style.visibility = "hidden";
        //make new results visible again
        const showNew = document.getElementsByClassName("elevationData");
        if (showNew) {
          for (let i = 0; i < showNew.length; i++) {
            showNew[i].style.visibility = "visible";
          }
        }
        //INSERT DATA TO HTML
        $("#elevation").html(result["data"]["gtopo30"] + " meters");

        //IF elevation === -9999 (in the ocean)
        if (result["data"]["gtopo30"] === -9999) {
          document.getElementById("elevationError").style.visibility =
            "visible";
          $("#elevationError").html("No elevation data for bodies of water.");
          $("#elevation").html("");
        }

        //IF NO RESULT FOR elevation
        if (!result["data"]["gtopo30"]) {
          document.getElementById("elevationError").style.visibility =
            "visible";
          $("#elevationError").html("No elevation data at these co-ordinates.");

          //hide prev results
          const hidePrev = document.getElementsByClassName("elevationData");
          if (hidePrev) {
            for (let i = 0; i < hidePrev.length; i++) {
              hidePrev[i].style.visibility = "hidden";
            }
          }
        }
      }
    },
  });

  //get weather data from API
  $.ajax({
    url: "resources/php/onclick/getWeather.php",
    type: "POST",
    dataType: "json",
    data: {
      lat: lat,
      lng: lng,
    },
    success: function (result) {
      if (result.status.name == "ok") {
        //console.log(JSON.stringify(result));
        //remove error message if result
        document.getElementById("weatherError").style.visibility = "hidden";
        //make new results visible again
        const showNew = document.getElementsByClassName("weatherData");
        if (showNew) {
          for (let i = 0; i < showNew.length; i++) {
            showNew[i].style.visibility = "visible";
          }
        }
        //INSERT DATA TO HTML
        $("#temperature").html(
          "Temperature (°C): " + result["data"]["temperature"]
        );
        $("#humidity").html("Humidity (%): " + result["data"]["humidity"]);
        $("#dewpoint").html("Dewpoint (°C): " + result["data"]["dewPoint"]);
        $("#pressure").html(
          "Pressure (hPa): " + result["data"]["hectoPascAltimeter"]
        );

        $("#clouds").html("Clouds: " + result["data"]["clouds"]);
        $("#windSpeed").html(
          "Wind Speed (Km/h): " + result["data"]["windSpeed"]
        );
        $("#windDirection").html(
          "Wind Direction (°): " + result["data"]["windDirection"]
        );
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //show error
      document.getElementById("weatherError").style.visibility = "visible";
      $("#weatherError").html(
        "No nearby weather stations at these co-ordinates."
      );

      //hide prev results
      const hidePrev = document.getElementsByClassName("weatherData");
      if (hidePrev) {
        for (let i = 0; i < hidePrev.length; i++) {
          hidePrev[i].style.visibility = "hidden";
        }
      }
    },
  });

  //open on map when data is updated
  coords.openOn(map);
};
//display popup on map, onclick
map.on("click", onMapClick);
// -- END OF API CALLS FOR onMapClick -- //
