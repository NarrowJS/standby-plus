import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser'
import { useEffect } from 'react'
import {makeRedirectUri, useAuthRequest} from 'expo-auth-session';
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import GoogleIcon from "@/assets/images/google.png"








GoogleSignin.configure({
  webClientId: '598591182474-iao2spcgm4vi9p2b3t5spsv0439kugb1.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/calendar.readonly']
})

const GoogleAuthBtn = () => {
  


  const signIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const userData = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      return tokens.accessToken
    } catch (error){
      console.log(error)
    }
  }

  const promptLogin = async () => {
    const googleToken = await signIn();
    
    if (googleToken)
    {
      await SecureStore.setItemAsync("google_token", googleToken)
    } else {
      console.error("no google token");
    }
    

  }

  

  

  return (
    <TouchableOpacity className='h-9 w-24 rounded-full flex items-center flex-row justify-center bg-zinc-800' onPress={() => {promptLogin()}}>
      <Image source={GoogleIcon} className='w-4 h-4 mr-2'></Image>
        <Text className='text-white'>Login</Text>
    </TouchableOpacity>
    
  )
}

export default GoogleAuthBtn