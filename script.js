let cityInput = document.querySelector("#cityInput");
let searchBtn = document.querySelector("#searchBtn");

let cityName = document.querySelector("#cityName");
let temperature = document.querySelector("#temperature");
let description = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let feelsLike = document.querySelector("#feelsLike");
let weatherIcon = document.querySelector("#weatherIcon");


// OpenWeather API Key
let apiKey = "";


// Search Button
searchBtn.addEventListener("click", getWeather);


// Enter Key
cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

});


// Get Weather
async function getWeather() {

    let city = cityInput.value.trim();


    // Empty Input
    if (city === "") {

        showError("Please enter a city name");

        return;
    }


    // Show Loading
    showLoading();


    try {

        // API URL
        let url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


        // API Request
        let response = await fetch(url);


        // Check Response
        if (!response.ok) {

            throw new Error("City not found");

        }


        // Convert Response to JSON
        let data = await response.json();


        // City Name
        cityName.textContent = data.name;


        // Temperature
        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;


        // Description
        description.textContent =
            data.weather[0].description;


        // Humidity
        humidity.textContent =
            `${data.main.humidity}%`;


        // Wind
        wind.textContent =
            `${data.wind.speed} m/s`;


        // Feels Like
        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;


        // OpenWeather Icon
        let iconCode = data.weather[0].icon;


        weatherIcon.innerHTML = `
            <img
                src="https://openweathermap.org/img/wn/${iconCode}@2x.png"
                alt="${data.weather[0].description}"
            >
        `;


    }
    catch (error) {

        showError(error.message);

    }

}


// Loading
function showLoading() {

    cityName.textContent = "Loading...";

    temperature.textContent = "--°C";

    description.textContent = "Getting weather data...";

    humidity.textContent = "--%";

    wind.textContent = "-- m/s";

    feelsLike.textContent = "--°C";


    weatherIcon.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
    `;

}


// Error
function showError(message) {

    cityName.textContent = "Oops!";

    temperature.textContent = "--°C";

    description.textContent = message;

    humidity.textContent = "--%";

    wind.textContent = "-- m/s";

    feelsLike.textContent = "--°C";


    weatherIcon.innerHTML = `
        <i class="fa-solid fa-circle-exclamation"></i>
    `;

}