// get all the references 
const form=document.querySelector('#weatherForm');
const input=document.querySelector('#inputs');
const search=document.querySelector('#search');
const loading=document.querySelector('#loadingMsg');
const errorMsg=document.querySelector('#errorMsg');
const displayDiv=document.querySelector('#Display');
const cityName=document.querySelector('#cityName');
const cityDes=document.querySelector('#cityDes');
const tempValue=document.querySelector('.tempDisplay span');
const humidityValue=document.querySelector('.humidityValue');
const windValue=document.querySelector('.windSpeedValue');

// Initial Setup: Hide UI states and data display when page loads
loading.classList.add('hidden');
errorMsg.classList.add('hidden');
displayDiv.classList.add('hidden');

// helper fn -> WEATHER CODE -> TEXT
function getWeatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code >= 1 && code <= 3) return "Partly cloudy";
  if (code >= 45 && code <= 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 71 && code <= 75) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown weather";
}

// FETCH LOGIC
async function fetchWeather(city) {
  try{
    // reset the UI -> show only loading msg
    loading.classList.remove('hidden');
    errorMsg.classList.add('hidden');
    displayDiv.classList.add('hidden');

    // get the coordinates
    const geoUrl=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const geoResponse = await fetch(geoUrl);
    const geoData= await geoResponse.json() ;

    if(!geoData.results || geoData.results.length===0)
    {
      throw new Error(`Could not find "${city}" Please check the spelling....`);
    }

    const {latitude, longitude, name, country}=geoData.results[0];
    // WEATHER DATA (coordinates->FORECAST)

//     if (!name.toLowerCase().includes(city.toLowerCase())) {
//    throw new Error(`Did you mean ${name}, ${country}? Try adding the country name.`);
// }

    const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    const weatherResponse= await fetch(weatherUrl);
    const weatherData= await weatherResponse.json();
    const current=weatherData.current;

    // MAKE THE DOM 
    cityName.textContent= `${name},${country}`;
    cityDes.textContent=getWeatherDescription(current.weather_code);
    tempValue.textContent=`${current.temperature_2m}`;
    humidityValue.textContent=`${current.relative_humidity_2m}%`;
    windValue.textContent= `${current.wind_speed_10m} km/h`;

    // HIDE LOADING , SHOW COMPLETED DISPLAY
    loading.classList.add('hidden');
    displayDiv.classList.remove('hidden');

  }
  catch(e){
    loading.classList.add('hidden');
    errorMsg.textContent= e.message;
    errorMsg.classList.remove('hidden');
    
  }
}

// submit event
form.addEventListener('submit',(e)=>{
  e.preventDefault();

  const city=input.value.trim();
  if(!city) return;

  fetchWeather(city);
});