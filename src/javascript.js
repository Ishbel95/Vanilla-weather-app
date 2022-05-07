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

  return `Last updated: ${day} ${hour}:${minutes}`;
}
// formate day from api using array
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

//future weather box
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row future-weather-box">`;
  forecast.forEach(function (forecastDay, index) {
    let forecastImage = forecastDay.weather[0].icon;
    let futureWeatherIcon = "future-weather-icon";
    let iconSource = `https://openweathermap.org/img/wn/${forecastImage}@2x.png`;
    if (forecastImage === "01d") {
      iconSource = `images/sun.png`;
    } else if (forecastImage === "02d") {
      iconSource = `images/sunandcloud.png`;
    } else if (forecastImage === "03d") {
      iconSource = `images/cloudy.png`;
    } else if (forecastImage === "04d") {
      iconSource = `images/cloudy.png`;
    } else if (forecastImage === "09d") {
      iconSource = `images/raining.png`;
    } else if (forecastImage === "10d") {
      iconSource = `images/raining.png`;
    } else if (forecastImage === "17d") {
      iconSource = `images/thunder.png`;
    } else if (forecastImage === "13d") {
      iconSource = `images/snowing.png`;
    } else if (forecastImage === "50d") {
      iconSource = `images/fog.png`;
    }
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class=${futureWeatherIcon}>
      <div class="col-12">
        <p>${formatDay(forecastDay.dt)}</p>
        <div class="col-12">
        <img id= "forecast-icon" src=${iconSource} alt="" />
        </div>
        <span class="max-temp">${Math.round(forecastDay.temp.max)}°</span
        ><span class="min-temp">${Math.round(forecastDay.temp.min)}°</span>
      </div>
    </div>
 `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//get apiurl using axios for the forecast
function getWeatherForecast(coordinates) {
  let apiKey = "1244d051e74e0f794e1452d1e9bf9e68";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/onecall?";
  let apiUrl = `${apiEndPoint}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// use api to get real temperature and weather description and call forecast function
function showCityTemperature(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp-change");
  temperatureElement.innerHTML = celsiusTemperature;
  document.querySelector("#temp-change").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(celsiusTemperature);
  if (celsiusTemperature >= 19) {
    let appHighTemp = document.querySelector("#app-temp-high");
    appHighTemp.classList.replace("weather-app", "weather-app-high-temp");
  } else if (celsiusTemperature < 19) {
    let appHighTemp = document.querySelector("#app-temp-high");
    appHighTemp.classList.replace("weather-app-high-temp", "weather-app");
  }
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#weather-description").style.textTransform =
    "capitalize";
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(
    "#humidity"
  ).innerHTML = ` ${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = ` ${response.data.wind.speed}`;
  document.querySelector(
    "#feels-like"
  ).innerHTML = ` ${response.data.main.feels_like}`;

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
  let weatherAnimation = document.querySelector("#weather-animation");
  let weatherAnimationHTML = `<div class="weather-container">`;
  if (currentWeatherIcon === "01d" || currentWeatherIcon === "01n") {
    weatherIcon.setAttribute("src", `images/sun.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class = "clear-sky-container"
      <div class="row clear-sky">
      <div class = col-7>
      <img src=images/sun.png class= "clear-sky">
      </div>
          </div>
          </div>`;
  } else if (currentWeatherIcon === "02d" || currentWeatherIcon === "02n") {
    weatherIcon.setAttribute("src", `images/sunandcloud.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="sun-cloud">
      <i class="fa-solid fa-cloud sun-cloud-cloud-top"></i>
        <img src=images/sun.png class= "sun-cloud-sun">
        <i class="fa-solid fa-cloud sun-cloud-cloud-bottom"></i>
          </div>`;
  } else if (
    currentWeatherIcon === "03d" ||
    currentWeatherIcon === "03n" ||
    currentWeatherIcon === "04d" ||
    currentWeatherIcon === "04n"
  ) {
    weatherIcon.setAttribute("src", `images/cloudy.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class = "cloud-container">
         <div class="row cloud-row">
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-top">
            <i class="fa-solid fa-cloud"></i>
          </div>
        </div>
        <div class="row cloud-row">
          <div class="col cloud-middle">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-middle">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-middle">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-middle">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-middle">
            <i class="fa-solid fa-cloud"></i>
          </div>
        </div>
        <div class="row cloud-row">
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
          <div class="col cloud-bottom">
            <i class="fa-solid fa-cloud"></i>
          </div>
         </div>
        </div>`;
  } else if (
    currentWeatherIcon === "09d" ||
    currentWeatherIcon === "09n" ||
    currentWeatherIcon === "10d" ||
    currentWeatherIcon === "10n"
  ) {
    weatherIcon.setAttribute("src", `images/raining.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="rain">
      <i class="fa-solid fa-cloud rain-cloud-top"></i>
        <i class="fa-solid fa-cloud rain-cloud-middle"></i>
        <i class="fa-solid fa-cloud rain-cloud-bottom"></i>
        <i class="fa-solid fa-droplet rain-one"></i>
        <i class="fa-solid fa-droplet rain-two"></i>
        <i class="fa-solid fa-droplet rain-three"></i>
        <i class="fa-solid fa-droplet rain-four"></i>
        <i class="fa-solid fa-droplet rain-five"></i>
        <i class="fa-solid fa-droplet rain-six"></i>
        <i class="fa-solid fa-droplet rain-seven"></i>
        <i class="fa-solid fa-droplet rain-eight"></i>
        <i class="fa-solid fa-droplet rain-nine"></i>
          </div>`;
  } else if (currentWeatherIcon === "11d" || currentWeatherIcon === "11n") {
    weatherIcon.setAttribute("src", `images/thunder.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="thunder">
      <i class="fa-solid fa-cloud thunder-cloud-top"></i>
        <i class="fa-solid fa-cloud thunder-cloud-middle"></i>
        <i class="fa-solid fa-cloud thunder-cloud-bottom"></i>
        <i class="fa-solid fa-bolt-lightning thunder-bolt"></i>
          </div>`;
  } else if (currentWeatherIcon === "13d" || currentWeatherIcon === "13n") {
    weatherIcon.setAttribute("src", `images/snowing.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="snow">
      <i class="fa-solid fa-cloud snow-cloud-top"></i>
        <i class="fa-solid fa-cloud snow-cloud-middle"></i>
        <i class="fa-solid fa-cloud snow-cloud-bottom"></i>
          <i class="fa-solid fa-snowflake snow-one"></i>
          <i class="fa-solid fa-snowflake snow-two"></i>
          <i class="fa-solid fa-snowflake snow-three"></i>
          </div>`;
  } else if (currentWeatherIcon === "50d" || currentWeatherIcon === "50n") {
    weatherIcon.setAttribute("src", `images/fog.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="fog">
        <i class="fa-solid fa-cloud cloud-fog"></i>
        <i class="fa-solid fa-minus fog-top"></i>
        <i class="fa-solid fa-minus fog-middle"></i>
        <i class="fa-solid fa-minus fog-bottom"></i>
          </div>`;
  }
  weatherAnimationHTML = weatherAnimationHTML + `</div>`;
  weatherAnimation.innerHTML = weatherAnimationHTML;
  getWeatherForecast(response.data.coord);
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
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
  showCityTemperature(response);
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

//
selectedCity("london");
myPosition(event);
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
