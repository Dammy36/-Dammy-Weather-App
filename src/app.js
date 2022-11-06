
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

    function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];


    
}
function displayForecast(response) {
    let forecast = response.data.daily;
    let foreElement = document.querySelector("#forecast");
    let forecastHTLM = `<div class="row">`; 
    
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTLM =
                forecastHTLM + `       

     
  <div class="col-2">
 <div class="date-forecast">${formatDay(forecastDay)}</div>                     
                        
 <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon} alt="" with="42" />
 <div class="forecast-temperature">
  <span class="forecast-temperature-max">
 ${Math.round(forecast.temperature.maximum)}°</span>
  <span class="forecast-temperature-min">
  ${Math.round(forecastDay.temperature.minimum)}°</span>
</div>                        
  </div>     
 `;
        }
            
    });
    
    forecastHTLM = forecastHTLM + `</div>`;
 foreElement.innerHTML = forecastHTLM;   
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey="ft2ff28777530dba3dddb311o0464bef"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`
    
    console.log(apiUrl)
    axios.get(apiUrl).then(displayForecast);
}

   function displayTemperature(response) {      
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city-temp");
    let descriptions = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
       let windElement = document.querySelector("#wind");
       let dateElement = document.querySelector("#date");
       let iconElement = document.querySelector("#icon");
       
       dateElement.innerHTML = formatDate(response.data.time * 1000);
       iconElement.setAttribute("alt", response.data.condition.description ) 
       iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
       windElement.innerHTML = response.data.wind.speed;
       humidityElement.innerHTML = response.data.temperature.humidity;   
       descriptions.innerHTML = response.data.condition.description;
       cityElement.innerHTML = response.data.city;
       celsiusTempareture=response.data.temperature.current
       temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    
        getForecast(response.data.coordinates);

}
function search(city) {
    let apiKey = "ft2ff28777530dba3dddb311o0464bef";    
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handlesubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");  
    search(cityInputElement.value);      
}
function showFahrenheitTempareture(event){
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheiTempareture = (celsiusTempareture * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheiTempareture);
    
}

function displayCelsiusTempareture(event) {
    event.preventDefault();
     celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTempareture);
}

let celsiusTempareture = null;
    
    
let form = document.querySelector("#search-engine");
form.addEventListener("submit", handlesubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTempareture);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTempareture);


search("lagos");
