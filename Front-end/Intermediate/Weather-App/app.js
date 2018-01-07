//Get Loading DOM
var loadingEl = document.getElementById("loading");

//Get Weather Portal DOM
var weatherPortal = document.getElementById("weather-portal");
var curWeatherLoc = document.getElementById("curWeatherLoc");
var curWeatherIcon = document.getElementById("curWeatherIcon");
var curWeatherTemp = document.getElementById("curWeatherTemp");
var curWeatherDesc = document.getElementById("curWeatherDesc");
var curWeatherDate = document.getElementById("curWeatherDate");
var curWeatherTime = document.getElementById("curWeatherTime");
var curWeatherDegC = document.getElementById("curWeatherDegC");
var curWeatherDegF = document.getElementById("curWeatherDegF");

//Get Week Forecast DOM
var weatherWeek = document.getElementById("weather-week");
var day1Date = document.getElementById("day1Date");
var day2Date = document.getElementById("day2Date");
var day3Date = document.getElementById("day3Date");
var day4Date = document.getElementById("day4Date");
var day5Date = document.getElementById("day5Date");

var day1Temp1 = document.getElementById("day1Temp1");
var day2Temp1 = document.getElementById("day2Temp1");
var day3Temp1 = document.getElementById("day3Temp1");
var day4Temp1 = document.getElementById("day4Temp1");
var day5Temp1 = document.getElementById("day5Temp1");

var day1Temp2 = document.getElementById("day1Temp2");
var day2Temp2 = document.getElementById("day2Temp2");
var day3Temp2 = document.getElementById("day3Temp2");
var day4Temp2 = document.getElementById("day4Temp2");
var day5Temp2 = document.getElementById("day5Temp2");

var day1Icon1 = document.getElementById("day1Icon1");
var day2Icon1 = document.getElementById("day2Icon1");
var day3Icon1 = document.getElementById("day3Icon1");
var day4Icon1 = document.getElementById("day4Icon1");
var day5Icon1 = document.getElementById("day5Icon1");

var day1Icon2 = document.getElementById("day1Icon2");
var day2Icon2 = document.getElementById("day2Icon2");
var day3Icon2 = document.getElementById("day3Icon2");
var day4Icon2 = document.getElementById("day4Icon2");
var day5Icon2 = document.getElementById("day5Icon2");

//Set DOM Visibility
function setVisibility(loading, weather) {
  loadingEl.style.display = loading;
  weatherPortal.style.display = weather;
  weatherWeek.style.display = weather;
}

//Get Geolocation and Forecast
const CELSIUS = "metric";
const FAHRENHEIT = "imperial";

function getForecast(u) {
  setVisibility("", "none");
  var geo_api = "http://ip-api.com/json";
  var forecast_link = "http://api.openweathermap.org/data/2.5/forecast?";
  var forecast_icon = "http://openweathermap.org/img/w/";
  var key = "&APPID=c5267e466cf092486ea82c70ad52aec7";
  var unit = "&units=" + u;
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var unit_txt;
  if(u === CELSIUS) {
    curWeatherDegC.checked = true;
    curWeatherDegF.checked = false;
    unit_txt = " &deg" + "C";
  }

  if(u === FAHRENHEIT) {
    curWeatherDegC.checked = false;
    curWeatherDegF.checked = true;
    unit_txt = " &deg" + "F";
  }

  var geo_xml = new XMLHttpRequest();
  geo_xml.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var geo_arr = JSON.parse(this.responseText);

      var lat = "&lat=" + geo_arr.lat;
      var lon = "&lon=" + geo_arr.lon;

      var forecast_api = forecast_link + lat + lon + unit + key;
      var forecast_xml = new XMLHttpRequest();
      forecast_xml.onreadystatechange = function() {
        var forecast_arr = JSON.parse(this.responseText);

        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth();
        var d = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();

        if(mm < 10) {
          mm = "0" + mm;
        }

        var fy = new String(fy);
        var fm = new String(m + 1);
        if(fm.length === 1) {
          fm = "0" + fm;
        }
        var fd = new String(d);
        var f_date = fy + "-" + fm + "-" + fd;

        var minTime = "06:00:00";
        var maxTime = "12:00:00";

        console.log(forecast_arr);
        curWeatherLoc.innerHTML = forecast_arr.city.name + ", " + forecast_arr.city.country;
        curWeatherIcon.setAttribute("src", forecast_icon + forecast_arr.list[0].weather[0].icon + ".png");
        curWeatherTemp.innerHTML = Math.floor(forecast_arr.list[0].main.temp) + unit_txt;
        curWeatherDesc.innerHTML = forecast_arr.list[0].weather[0].description;
        curWeatherDate.innerHTML = d + " " + month[m] + " " + y;
        curWeatherTime.innerHTML = hh + ":" + mm;

        var forecast_list = [];
        for(var i = 0; i < forecast_arr.list.length; i++) {
          if(forecast_arr.list[i].dt_txt.includes(f_date) === false &&
            (forecast_arr.list[i].dt_txt.includes(minTime) || forecast_arr.list[i].dt_txt.includes(maxTime))) {
              forecast_list.push([forecast_arr.list[i].dt_txt, forecast_arr.list[i].main.temp,
              forecast_arr.list[i].weather[0].description, forecast_arr.list[i].weather[0].icon]);
            }
        }

        console.log(forecast_list);

        day1Date.innerHTML = forecast_list[0][0].replace("06:00:00", "");
        day2Date.innerHTML = forecast_list[2][0].replace("06:00:00", "");
        day3Date.innerHTML = forecast_list[4][0].replace("06:00:00", "");
        day4Date.innerHTML = forecast_list[6][0].replace("06:00:00", "");
        day5Date.innerHTML = forecast_list[8][0].replace("06:00:00", "");

        day1Temp1.innerHTML = Math.floor(forecast_list[0][1]) + unit_txt;
        day2Temp1.innerHTML = Math.floor(forecast_list[2][1]) + unit_txt;
        day3Temp1.innerHTML = Math.floor(forecast_list[4][1]) + unit_txt;
        day4Temp1.innerHTML = Math.floor(forecast_list[6][1]) + unit_txt;
        day5Temp1.innerHTML = Math.floor(forecast_list[8][1]) + unit_txt;


        day1Temp2.innerHTML = Math.floor(forecast_list[1][1]) + unit_txt;
        day2Temp2.innerHTML = Math.floor(forecast_list[3][1]) + unit_txt;
        day3Temp2.innerHTML = Math.floor(forecast_list[5][1]) + unit_txt;
        day4Temp2.innerHTML = Math.floor(forecast_list[7][1]) + unit_txt;
        day5Temp2.innerHTML = Math.floor(forecast_list[9][1]) + unit_txt;

        day1Icon1.setAttribute("src", forecast_icon + forecast_list[0][3] + ".png");
        day2Icon1.setAttribute("src", forecast_icon + forecast_list[2][3] + ".png");
        day3Icon1.setAttribute("src", forecast_icon + forecast_list[4][3] + ".png");
        day4Icon1.setAttribute("src", forecast_icon + forecast_list[6][3] + ".png");
        day5Icon1.setAttribute("src", forecast_icon + forecast_list[8][3] + ".png");

        day1Icon2.setAttribute("src", forecast_icon + forecast_list[1][3] + ".png");
        day2Icon2.setAttribute("src", forecast_icon + forecast_list[3][3] + ".png");
        day3Icon2.setAttribute("src", forecast_icon + forecast_list[5][3] + ".png");
        day4Icon2.setAttribute("src", forecast_icon + forecast_list[7][3] + ".png");
        day5Icon2.setAttribute("src", forecast_icon + forecast_list[9][3] + ".png");

        setVisibility("none", "");
      }
      forecast_xml.open("GET", forecast_api, true);
      forecast_xml.send();
    }
  }

  geo_xml.open("GET", geo_api, true);
  geo_xml.send();
}

getForecast(CELSIUS);
