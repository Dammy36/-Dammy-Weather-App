
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        minutes`0${hours}`;
}

    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes`0${minutes}`;
}

    let days = ["Sunday", "Monday", "Tuesday" ,"Wednesday" ,"Thursday" ,"Friday", "Saturday"];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
    
}

   function displayTemperature(response) {      
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city-temp");
    let descriptions = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
       let windElement = document.querySelector("#wind");
       let dateElement = document.querySelector("#date");

       
       dateElement.innerHTML = formatDate(response.data.pressure *1000);

    windElement.innerHTML= response.data.wind.speed;
    humidityElement.innerHTML = response.data.temperature.humidity;   
    descriptions.innerHTML = response.data.condition.description;
    cityElement.innerHTML = Math.round(response.data.city);
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    
}


let apiKey = "ft2ff28777530dba3dddb311o0464bef"
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=lagos&key=ft2ff28777530dba3dddb311o0464bef&units=metric`


axios.get(apiUrl).then(displayTemperature);
