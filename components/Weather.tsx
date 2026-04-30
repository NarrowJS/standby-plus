import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import {fetchWeatherData} from '@/api/weather'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Weather = () => {
    const [weatherData, setWeatherData] = useState<JSON|null>(null);

    const fetchCity = async () => {
        try {
            const cityData = await AsyncStorage.getItem('city');
            if (cityData)
            {
                return cityData;
            }
        } catch (error) {
            console.error('error fetching city');
        }
    }
    const fetchData = async () => {
        const city = await fetchCity()
        const data = await fetchWeatherData(city);
        setWeatherData(data)
    }

    useEffect(() => {
        fetchData();
      //  console.log(weatherData?.temperature);
    }, [])


    return (
        <View className='flex-row justify-between mr-9 p-4 w-full'>
            
            <View className='flex-col'>
                <Text className='text-5xl font-medium text-white'>{weatherData ? weatherData.temperature + "°F": "Tap to Setup"}</Text>
                <Text className='text-xl text-gray-300'>{weatherData ? weatherData?.weather_type : "N/A" }</Text>
            </View>

            <Text className='text-xl text-white'>{weatherData?.city}</Text>
        </View>
  )
}

export default Weather