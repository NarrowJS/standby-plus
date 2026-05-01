import { useEffect, useState } from "react";
import { PlayerState } from "@/ExpoSpotifySDK.types"
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useSpotifyPlayerState() {
    const [playerState, setPlayerState] = useState<PlayerState | null>(null);
    const [authToken, setAuthToken] = useState(null);
    const [mediaInfo, setMediaInfo] = useState(null)

    const nextTrack = async() => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/next', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    } catch (error) {
      console.error('error getting next track: ',error)
    }
  }

  const prevTrack = async() => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    } catch (error) {
      console.error('error getting previous track: ',error)
    }
  }

  const pauseTrack = async() => {
    console.log('pausing track')
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    } catch (error) {
      console.error('error pausing track: ',error)
    }
  }

  const resumeTrack = async() => {
    try {
      const res = await fetch('https://api.spotify.com/v1/me/player/play', {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
    } catch (error) {
      console.error('error resuming track: ',error)
    }
  }

  const fetchToken = async() => {
    console.log("fetching spotify token...")
    try {
      const value = await AsyncStorage.getItem('token');
      if (value != null) {
        console.log("got token: "+value);
        setAuthToken(value);
      }
      console.log("spotify token: "+value)
    } catch (error) {
      console.error("error fetching token: ",error);
    }
  }

  const getCurrentSong = async() => {
    try {
     // console.log("getting current song: ", authToken)
      const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing?additional_types=episode', {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })
      
      if (res.status == 204) {
        console.log("no song playing")
      }

      if (res.status == 200) {
        const data = await res.json();
        setPlayerState(data);
        //console.log(data)

        const mediaType = data.currently_playing_type
        //console.log('media type: ',mediaType)
        let mediaInfo;

        if (mediaType == "track") {
          mediaInfo = {
            title: data.item.name,
            author: data.item.artists[0].name,
            cover_image: data.item.album.images[0].url,
            progress: data.progress_ms,
            duration: data.item.duration_ms
          }
        } else {
          mediaInfo = {
            title: data.item.show.name,
            author: data.item.show.publisher,
            cover_image: data.item.images[0].url,
            progress: data.progress_ms,
            duration: data.item.duration_ms
          }
        }

  //      console.log(mediaInfo)
        setMediaInfo(mediaInfo);

        
      }

      if (!res.ok) {
        fetchToken();
        throw new Error('failed to fetch current track')
      }

      
    } catch (error) {
      console.log("error getting current song: ",error)
      fetchToken();
    }
  }

  useEffect(() => {

    fetchToken();
   
    
  }, [])


  useEffect(() => {
    const interval = setInterval(getCurrentSong ,1500)
    return() => clearInterval(interval)
  
  }, [authToken])


  return {
    playerState,
    mediaInfo,
    nextTrack,
    prevTrack,
    pauseTrack,
    resumeTrack
  }
}