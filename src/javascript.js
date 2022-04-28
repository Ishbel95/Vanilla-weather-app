// get the current days and time

function changeDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  //make the hours and minutes 00

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}: ${hour}:${minutes}`;
}
let currentDate = new Date();
let currentTimeElement = document.querySelector("#current-time");
currentTimeElement.innerHTML = changeDate(currentDate);

// use api to get real temperature and weather description

function showCityTemperature(response) {
  console.log(response);
  document.querySelector("#temp-change").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
}

// build url and use axios to get url then execute showCityTemperature function.
//connect the search input value to the city entered and get the information for that city from the api.
function selectedCity(city) {
  let apiKey = "1244d051e74e0f794e1452d1e9bf9e68";
  let unit = "metric";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndPoint}q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showCityTemperature);
}
function weatherSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  selectedCity(city);
}

//on load search for london
selectedCity("London");

//if search it will go to the function weatherSearch and then selectedCity
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", weatherSearch);

//change the location, temperature and weather description to current location using info from api.

function showTemp(response) {
  console.log(response);
  document.querySelector("#temp-change").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#city").style.fontSize = "1.8rem";

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
}

// get url using axios and current coordinates all from api

function getPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "1244d051e74e0f794e1452d1e9bf9e68";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let unit = "metric";
  let url = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

//get current position function

function myPosition(event) {
  navigator.geolocation.getCurrentPosition(getPosition);
}

//select button and execute myPosition function

let geoButton = document.querySelector("#geo-location");
geoButton.addEventListener("click", myPosition);

//convert temperature to fahrenheit on click

function fahrenheitChange(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-change");
  let fahrenheitTemp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((fahrenheitTemp * 9) / 5 + 32);
}

// select fahrenheit button and execute function above

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", fahrenheitChange);

//convert temp to celsius on click

function celsiusChange(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-change");
  let celsiusTemp = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((celsiusTemp - 32) * 5) / 9);
}
// select celsius button and execute function above

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", celsiusChange);
