// get the current days and time
function changeDate(timestamp) {
  let date = new Date(timestamp);
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

  return `${day} ${hour}:${minutes}`;
}

// use api to get real temperature and weather description
function showCityTemperature(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-change");
  temperatureElement.innerHTML = celsiusTemperature;
  document.querySelector("#temp-change").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#weather-description").style.textTransform =
    "capitalize";
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;

  document.querySelector("#current-time").innerHTML = changeDate(
    response.data.dt * 1000
  );

  let currentWeatherIcon = response.data.weather[0].icon;
  let weatherIcon = document.querySelector("#current-weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
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

//convert temperature to fahrenheit on click
function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-change");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

//convert temp to celsius on click
function showCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#temp-change").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
//on load search for london
selectedCity("London");

// select fahrenheit button and execute function
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

//if search it will go to the function weatherSearch and then selectedCity
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", weatherSearch);

// select celsius button and execute function
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

//select button and execute myPosition function
let geoButton = document.querySelector("#geo-location");
geoButton.addEventListener("click", myPosition);
