import { View, Text, TouchableOpacity, Alert, Image } from 'react-native'
import { useSpotifyAuthentication } from '@/hooks/useSpotifyAuthentication';
import React, { useEffect, useState } from 'react'
import { useSpotifyPlayerState } from '@/hooks/useSpotifyPlayerState';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ProgressBar from './ProgressBar';

import PlayIcon from '@/assets/images/play_arrow_filled.png';
import PauseIcon from '@/assets/images/pause.png';
import FastForwardIcon from '@/assets/images/fast_forward_filled.png';
import FastRewindIcon from '@/assets/images/fast_rewind_filled.png';

const Music = () => {
  const {authenticateAsync } = useSpotifyAuthentication();


  async function handleAuthenticatePress() {
    try {
      const session = await authenticateAsync({
        tokenSwapURL: "http://192.168.1.90:3000/swap",
        tokenRefreshURL: "http://192.168.1.90:3000/refresh",
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

  const refreshToken = async() => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("refreshing token...")
    try {
      const response = await axios.post("http://192.168.1.90:3000/refresh", {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
      });

      console.log("refresh the token: ", response.data.access_token);
      AsyncStorage.setItem("token", response.data.access_token);

      const now = new Date();
      const expirationDate = now.setHours(now.getHours() + 1);
      AsyncStorage.setItem("expirationDate", expirationDate.toString());

      console.log("token refreshed")

    } catch (error) {
      console.error("error refreshing token: ",error)
    }
  }


  useEffect(() => {
    const validateToken = async() => {
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      const currentTime = Date.now();

      if (expirationDate) {
        if (currentTime > parseInt(expirationDate)) {
          console.log("token expired")
          refreshToken()
        } else {
     //     console.log("token is valid")
        }
      }
    }
    validateToken()
  }, [])

  const currentSong = useSpotifyPlayerState();

  


  return (

    <View className='items-center'>
    <View className='flex flex-col p-2'>
      
      
      {currentSong.mediaInfo ?
      <View className='flex-row mb-2'>
        <Image className='w-14 h-14 rounded-lg' source={{uri: currentSong.mediaInfo.cover_image}}></Image>

        <View className='flex-col ml-2'>
          <Text className='text-white text-lg font-semibold'>{currentSong.mediaInfo.title}</Text>
          <Text className='text-white font-light'>{currentSong.mediaInfo.author}</Text>
        </View>
        
      </View>
       :
       <Text className='text-white'>Nothing playing</Text>
      }
      <ProgressBar progress={currentSong.mediaInfo?.progress} duration={currentSong.mediaInfo?.duration}/>


      <View className='flex-1 items-center mt-3'>

      
      

      
      
      <View className='flex-row h-full'>
        <TouchableOpacity className='w-16' onPress={currentSong.prevTrack}><Image source={FastRewindIcon}></Image></TouchableOpacity>
        {currentSong?.playerState?.is_playing ? 
        <TouchableOpacity className='w-16 ml-4' onPress={currentSong.pauseTrack}><Image source={PauseIcon}></Image></TouchableOpacity> 
        :
        <TouchableOpacity className='w-16 ml-4' onPress={currentSong.resumeTrack}><Image source={PlayIcon}></Image></TouchableOpacity>  
        }
        <TouchableOpacity className='w-16 ml-4' onPress={currentSong.nextTrack}><Image source={FastForwardIcon}></Image></TouchableOpacity>
      </View>

      
      </View>
    </View>
    </View>
  )
}

export default Music