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
      iconSource = `images/clearsky.svg`;
    } else if (forecastImage === "02d") {
      iconSource = `images/sunandcloud.png`;
    } else if (forecastImage === "03d") {
      iconSource = `images/cloudy.png`;
    } else if (forecastImage === "04d") {
      iconSource = `images/cloudy.png`;
    } else if (forecastImage === "09d") {
      iconSource = `images/rain.png`;
    } else if (forecastImage === "10d") {
      iconSource = `images/rain.png`;
    } else if (forecastImage === "17d") {
      iconSource = `images/thunder.svg`;
    } else if (forecastImage === "13d") {
      iconSource = `images/snow.svg`;
    } else if (forecastImage === "50d") {
      iconSource = `images/fog.svg`;
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
  if (currentWeatherIcon === "01n") {
    weatherIcon.setAttribute("src", `images/clearsky.svg`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="clear-sky">
      <img src=images/clearsky.svg class= "clear-sky">
          </div>`;
  } else if (currentWeatherIcon === "02n") {
    weatherIcon.setAttribute("src", `images/sunandcloud.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="sun-cloud">
        <img src=images/clearsky.svg class= "sun-cloud-sun">
        <i class="fa-solid fa-cloud sun-cloud-cloud"></i>
          </div>`;
  } else if (currentWeatherIcon === "03n") {
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
  } else if (currentWeatherIcon === "04n") {
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
  } else if (currentWeatherIcon === "09n") {
    weatherIcon.setAttribute("src", `images/rain.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class = "rain-container">
          <div class="row rain-row">
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
          </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
         </div>
       <div class="row rain-row">
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
        </div>
        <div class="row rain-row">
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
         </div>
        </div>`;
  } else if (currentWeatherIcon === "10n") {
    weatherIcon.setAttribute("src", `images/rain.png`);
    weatherIcon.setAttribute("src", `images/rain.png`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class = "rain-container">
          <div class="row rain-row">
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
          </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
           <div class="col rain-top">
            <i class="fa-solid fa-droplet"></i>
           </div>
         </div>
       <div class="row rain-row">
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-middle">
            <i class="fa-solid fa-droplet"></i>
          </div>
        </div>
        <div class="row rain-row">
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
          <div class="col rain-bottom">
            <i class="fa-solid fa-droplet"></i>
          </div>
         </div>
        </div>`;
  } else if (currentWeatherIcon === "11n") {
    weatherIcon.setAttribute("src", `images/thunder.svg`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="thunder">
        <i class="fa-solid fa-cloud thunder-cloud"></i>
        <i class="fa-solid fa-bolt-lightning thunder-bolt"></i>
          </div>`;
  } else if (currentWeatherIcon === "13n") {
    weatherIcon.setAttribute("src", `images/snow.svg`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class = "snow-container">
          <div class="row snow-row">
           <div class="col snow-top">
             <i class="fa-solid fa-snowflake"></i>
          </div>
           <div class="col snow-top">
             <i class="fa-solid fa-snowflake"></i>
           </div>
           <div class="col snow-top">
             <i class="fa-solid fa-snowflake"></i>
           </div>
           <div class="col snow-top">
             <i class="fa-solid fa-snowflake"></i>
           </div>
           <div class="col snow-top">
             <i class="fa-solid fa-snowflake"></i>
           </div>
         </div>
       <div class="row snow-row">
          <div class="col snow-middle">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-middle">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-middle">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-middle">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-middle">
            <i class="fa-solid fa-snowflake"></i>
          </div>
        </div>
        <div class="row snow-row">
          <div class="col snow-bottom">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-bottom">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-bottom">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-bottom">
            <i class="fa-solid fa-snowflake"></i>
          </div>
          <div class="col snow-bottom">
            <i class="fa-solid fa-snowflake"></i>
          </div>
         </div>
        </div>`;
  } else if (currentWeatherIcon === "50n") {
    weatherIcon.setAttribute("src", `images/fog.svg`);
    weatherAnimationHTML =
      weatherAnimationHTML +
      `<div class="fog">
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
