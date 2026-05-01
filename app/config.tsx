import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import {router} from 'expo-router'
import { useLocalSearchParams } from 'expo-router';
import { useSpotifyAuthentication } from '@/hooks/useSpotifyAuthentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Linking } from 'react-native';
import GoogleAuthBtn from '@/components/GoogleAuthBtn';


const config = () => {
  const {type} = useLocalSearchParams();
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  const [city, setCity] = useState("");
  const {authenticateAsync} = useSpotifyAuthentication()

    async function handleAuthenticatePress() {
    try {
      const session = await authenticateAsync({
        tokenSwapURL: "https://standby-plus.vercel.app/swap",
        tokenRefreshURL: "https://standby-plus.vercel.app/refresh",
        scopes: [
          "ugc-image-upload",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
          "app-remote-control",
          "streaming",
          "playlist-read-private",
          "playlist-read-collaborative",
          "playlist-modify-private",
          "playlist-modify-public",
          "user-follow-modify",
          "user-follow-read",
          "user-top-read",
          "user-read-recently-played",
          "user-library-modify",
          "user-library-read",
          "user-read-email",
          "user-read-private",
        ]
      });



    } catch (error) {
      console.error('Authentication failed:', error)
    }
  }
  


      const fetchSpotifyToken = async() => {
        console.log("fetching...")
        try {
          const token = await AsyncStorage.getItem('token');
          if (token) {
            setSpotifyConnected(true);
            console.log("true")
          } else {
            console.log("no token")
          }
            
        } catch {
          console.error("error fetching spotify token");
        }
      }

      const fetchCity = async () => {
        try {
          const city = await AsyncStorage.getItem('city');
          if (city != null) {
            setCity(city);
          }
        } catch {
          console.error("error fetching city")
        }
      }

      const saveData = async() => {
        try {
          await AsyncStorage.setItem('city',city)
        } catch {
          console.error("error saving data");
        }
      }

      const handleSubmit = () => {
        saveData();
        router.push('/')
      }

    useEffect(() => {
        fetchSpotifyToken();
        fetchCity();
        console.log("settings loaded")
      }, [])


      

    


  
  return (
    <View className='bg-black flex-1 p-9'>
      <View className='justify-between flex-row items-center'>
      <Text className='text-white text-4xl font-semibold'>Settings</Text>
      <TouchableOpacity className='w-36 h-16 bg-blue-500 rounded-xl justify-center items-center' onPress={handleSubmit}>
        <Text className='text-white text-xl font-semibold'>Save</Text>
      </TouchableOpacity>
      </View>

      <View className='w-96'>
        <Text className='text-2xl text-white mb-2'>Connections</Text>
        <View className='mb-4'>
          <Text className='text-white text-xl mr-3'>Spotify</Text>

          <View >
          {spotifyConnected ? <Text className='text-green-300'>Connected</Text> : <View className='flex-row'><Text className='text-red-300 ml-2 '>Not connected</Text></View>}
          {spotifyConnected ? <></> : <TouchableOpacity className='bg-blue-500 p-3 rounded-lg w-24' onPress={(async() => {handleAuthenticatePress()})}><Text className='text-white font-semibold text-center'>Connect</Text></TouchableOpacity>}
          
          </View>
        </View>
        <View className='mb-4'>
          <Text className='text-white text-xl mr-3 mb-2'>Google Calender</Text>
          <View>
           <GoogleAuthBtn/>
          </View>
        </View>

        <Text className='text-2xl text-white mb-2'>Weather</Text>
        <View className='w-full'>
          <Text className='text-white text-xl mr-3 mb-2'>City</Text>
          <TextInput className='text-white border-gray-500 border-2 p-2 w-full rounded-lg' onChangeText={(text) => {setCity(text);}}>{city}</TextInput>
        </View>
      </View>
    </View>
  )
}

export default config