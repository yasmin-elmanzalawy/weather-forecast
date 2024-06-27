let searchBar = document.getElementById("searchBar");
let today = document.getElementById("today");
let todayDay = document.getElementById("todayDay");
let todayDate = document.getElementById("todayDate");
let todayMonth = document.getElementById("todayMonth");
let todayTemp = document.getElementById("todayTemp");
let todayConditionImg = document.getElementById("todayConditionImg");
let todayConditionText = document.getElementById("todayConditionText");
let todayhumidity = document.getElementById("todayhumidity");
let todayWind = document.getElementById("todayWind");
let todayWindDirection = document.getElementById("todayWindDirection");
let forecastMaxTemp = document.getElementsByClassName("maxTemp");
let forecastMinTemp = document.getElementsByClassName("minTemp");
let forecastCondition = document.getElementsByClassName("forecastCondition");
let forecastCondtionImg = document.getElementsByClassName(
  "forecastCondtionImg"
);
let nextDay = document.getElementsByClassName("nextDay");

// search bar start
searchBar.addEventListener("input", async function () {
  let searchInput = await searchBar.value;
  getWeatherApi(searchInput);
  console.log(searchInput);
});
// search bar end

async function getWeatherApi(locationName = "alexandria") {
  if (locationName.length > 2) {
    let res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=327d07d94bd14005bae75704242506&q=${locationName}&days=3`
    );
    let data = await res.json();
    if (!data.error) {
      displayToday(data);
      displayForecast(data);
    }
  }
}
getWeatherApi();

// today's weather start
function displayToday(data) {
  let todayFullDate = new Date();
  todayDay.innerHTML = todayFullDate.toLocaleDateString("en-us", {
    weekday: "long",
  });
  todayDate.innerHTML = todayFullDate.getDate();
  todayMonth.innerHTML = todayFullDate.toLocaleDateString("en-us", {
    month: "long",
  });
  today.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayConditionImg.setAttribute("src", data.current.condition.icon);
  todayConditionText.innerHTML = data.current.condition.text;
  todayhumidity.innerHTML = data.current.humidity;
  todayWind.innerHTML = data.current.wind_kph;
  todayWindDirection.innerHTML = data.current.wind_dir;
}
// today's weather end

// following days weather start
function displayForecast(data) {
  let forecast = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forecast[i + 1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString("en-us", {
      weekday: "long",
    });
    forecastCondtionImg[i].setAttribute(
      "src",
      forecast[i + 1].day.condition.icon
    );
    forecastMaxTemp[i].innerHTML = forecast[i + 1].day.maxtemp_c;
    forecastMinTemp[i].innerHTML = forecast[i + 1].day.mintemp_c;
    forecastCondition[i].innerHTML = forecast[i + 1].day.condition.text;
  }
}
// following days weather end
