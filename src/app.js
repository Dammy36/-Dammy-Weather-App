function displayTemperature(response) {
    console.log(response.data);     
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city-temp");
    let descriptions = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");

    windElement.innerHTML= response.data.wind.speed;
    humidityElement.innerHTML = response.data.temperature.humidity;   
    descriptions.innerHTML = response.data.condition.description;
    cityElement.innerHTML = Math.round(response.data.city);
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    
}


let apiKey = "ft2ff28777530dba3dddb311o0464bef"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=lagos&key=ft2ff28777530dba3dddb311o0464bef&units=metrics`

axios.get(apiUrl).then(displayTemperature);