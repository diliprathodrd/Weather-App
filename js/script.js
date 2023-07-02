// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
  key: "dfa4221ee71cd81bb5508c411aba97e2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

//Event Listener functon on keypress
const searchInputBox = document.getElementById("input-box");

searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
    console.log(searchInputBox.value);
  }
});

//Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport);
}

//Show Weather Report
function showWeatherReport(weather) {
  let city = document.getElementById("city");
  let temp = document.getElementById("temp");
  let minMaxTemp = document.getElementById("min-max");
  let weatherType = document.getElementById("weather");
  let date = document.getElementById("date");
  let todayDate = new Date();

  if(weather.cod === 200) {
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;
  weatherType.innerText = `${weather.weather[0].main}`;
  date.innerText = dateManage(todayDate);
  } else {
  city.innerText = "";
  temp.innerHTML = `${weather.message}`;
  minMaxTemp.innerHTML = "";
  weatherType.innerText = "";
  date.innerText = "";
  }
  /*
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('../images/clear.jpg')";
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('../images/cloud.jpg')";
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('../images/rain.jpg')";
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('../images/snow.jpg')";
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('../images/thunderstorm.jpg')";
  } else if (weatherType.textContent == "Sunny") {
    document.body.style.backgroundImage = "url('../images/sunny.jpg')";
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('../images/haze.jpg')";
  }
  */
}

//Date Manage
function dateManage(todayDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = todayDate.getFullYear();
  let month = months[todayDate.getMonth()];
  let date = todayDate.getDate();
  let day = days[todayDate.getDay()];

  return `${date} ${month} ${year}, (${day})`;
}
