import { fetchWeatherApi } from "openmeteo";
import axios from "axios";



const url = "https://api.open-meteo.com/v1/forecast";


const WMO_WEATHER_CODES: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Light',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Light',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Light',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Light',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};


const fetchCoords = async(city: string) => {
    try{
        const res = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
        return{
            lat: res.data.results[0].latitude,
            lon : res.data.results[0].longitude
        }
    } catch (error){
        console.error('error fetching coords: ',error)
    }
}


export const fetchWeatherData = async(city: string) => {
    const coordsData = await fetchCoords(city);
    const params = {
        latitude: coordsData?.lat,
        longitude: coordsData?.lon,
        hourly: ["temperature_2m", "weather_code"],
        current: ["temperature_2m", "weather_code"],
        forecast_days: 1,
        temperature_unit: 'fahrenheit'
    }   
    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0]

        const utcOffsetSeconds = response.utcOffsetSeconds();

        const current = response.current()!;
        const hourly = response.hourly()!;
        console.log(current)


        const weatherData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                temperature_2m: current.variables(0)!.value(),
                weather_code: current.variables(1)!.value(),
            },
            hourly: {
                time: Array.from(
                    { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
                    (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
                ),
                temperature_2m: hourly.variables(0)!.valuesArray(),
                weather_code: hourly.variables(1)!.value(),
            },
        };

       
        const weatherCodeString = WMO_WEATHER_CODES[weatherData.current.weather_code];

        return {
            temperature: Math.round(weatherData.current.temperature_2m),
            weather_code: weatherData.current.weather_code,
            city,
            weather_type: weatherCodeString
        }
        
    } catch (error) {
        console.error('error fetching weather data: ',error)
    }
}

