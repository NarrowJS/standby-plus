import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function AuthenticatePage() {
  const { code } = useLocalSearchParams();
  const router = useRouter();

  const saveToken = async(token : string, expirationDate : Number, refreshToken : string) => {
    try {
      console.log("saving token: ", token);

      AsyncStorage.setItem("token",token.toString());
      AsyncStorage.setItem("expirationDate", expirationDate.toString());
      AsyncStorage.setItem("refreshToken", refreshToken);

      console.log("token saved")
    } catch(error) {
      console.log("error saving token: "+error);
    }
  }

  useEffect(() => {
    async function exchangeCode() {
      if (!code) return;

      try {
        console.log("Code found in URL, initiating manual swap...");
    
        const response = await axios.post("https://standby-plus.vercel.app/swap", {
          code: code
        });

        console.log("Token Swap Successful:", response.data);
        console.log(response.data.expires_in)
        
        const now = new Date();
        const expirationDate = now.setHours(now.getHours() + 1);

        const refreshToken = response.data.refresh_token;

        console.log("token expires at ",expirationDate);
        saveToken(response.data.access_token, expirationDate, refreshToken);
        
        router.replace('/'); 
      } catch (error) {
        console.error("Manual Swap Failed")
      }
    }

    exchangeCode();
  }, [code]);

  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Processing Spotify Login...</Text>
    </View>
  );
}