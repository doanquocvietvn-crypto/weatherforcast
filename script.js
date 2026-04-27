const API_KEY = "YOUR_API_KEY";
const city = "Da Nang";

async function loadWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
  document.getElementById("desc").innerText = data.weather[0].description;
  document.getElementById("humidity").innerText = data.main.humidity;
  document.getElementById("wind").innerText = data.wind.speed;
  document.getElementById("feels").innerText = data.main.feels_like;
  document.getElementById("pressure").innerText = data.main.pressure;

  document.getElementById("sunrise").innerText =
    new Date(data.sys.sunrise * 1000).toLocaleTimeString();

  document.getElementById("sunset").innerText =
    new Date(data.sys.sunset * 1000).toLocaleTimeString();
}

async function loadForecast() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  const data = await res.json();

  const temps = data.list.slice(0, 8).map(i => i.main.temp);
  const labels = data.list.slice(0, 8).map(i => i.dt_txt.slice(11,16));

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Temperature",
        data: temps,
        borderWidth: 3,
      }]
    }
  });
}

loadWeather();
loadForecast();
