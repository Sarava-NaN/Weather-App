// Variables
const Animated__Slide__Bar = document.getElementById("indicator");
const logo = document.querySelectorAll(".logo a");
const _input = document.getElementById("input");
const $Btn = document.querySelector(".search_btn");
const $temp = document.querySelector(".temp");
const $location = document.querySelector(".location");
const $percentage = document.querySelector(".percentage");
const $km = document.querySelector(".km");
const Error = document.querySelector(".error");
const weatherApp = document.querySelector(".weather-App");
const spelling = document.getElementById("Mistake");
const $Icon = document.getElementById("weatherIcon");
//

function SlideBar(eventHandler) {
  Animated__Slide__Bar.style.left = eventHandler.offsetLeft + "px";
  Animated__Slide__Bar.style.width = eventHandler.offsetWidth + "px";
  Animated__Slide__Bar.style.display = "block";
}

logo.forEach((select) => {
  select.addEventListener("click", (e) => {
    SlideBar(e.target);
    e.preventDefault();
  });
});
// Click to Enter
document.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    $Btn.click();
  }
});

async function checkWeather() {
  // Api_keys & URL
  const Api_Key = "9c12ba4f221223971e8f6bbd6b2f547e";
  const Api_URL = `https://api.openweathermap.org/data/2.5/weather?q=${_input.value}&units=metric&appid=${Api_Key}`;
  //
  const response = await fetch(Api_URL);
  const data = await response.json();
  //   console.log(data);
  if (response.status == "404") {
    Error.style.display = "block";
    spelling.textContent = _input.value + " is Invalid";
    spelling.style.fontFamily = "Lilita One";
    spelling.style.color = "wheat";
    weatherApp.style.display = "none";
  } else {
    if (_input.value == "") {
      return 0;
    }
    $location.innerHTML = data.name;
    $location.style.color = "#c3073f";
    $temp.textContent = Math.round(data.main.temp) + " °C";
    $temp.style.color = "orangered";
    $percentage.textContent = data.main.humidity + "%";
    $km.textContent = Math.round(data.wind.speed) + " km/h";
    //
    if (data.weather[0].main == "Clouds") {
      $Icon.src = "assets/Images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      $Icon.src = "assets/Images/clear.png";
    } else if (data.weather[0].main == "Mist") {
      $Icon.src = "assets/Images/mist.png";
    } else if (data.weather[0].main == "Rain") {
      $Icon.src = "assets/Images/rain.png";
    } else if (data.weather[0].main == "Snow") {
      $Icon.src = "assets/Images/snow.png";
    } else if (data.weather[0].main == "Smoke") {
      $Icon.src = "assets/Images/drizzle.png";
    } else if (data.weather[0].main == "Haze") {
      $Icon.src = "assets/Images/drizzle.png";
    }
    //

    Error.style.display = "none";
    weatherApp.style.display = "block";
  }
}
// Assign the function to Search Icon
$Btn.addEventListener("click", checkWeather);
// "Clouds" "Mist" "Clear" "Smoke" "Haze" "Rain"
checkWeather();
