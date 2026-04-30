import { isAvailable, Authenticate } from "@42techpacks/expo-spotify-sdk";


export function useSpotifyAuthentication() {
  return {
    isAvailable,
    authenticateAsync: Authenticate.authenticateAsync,
  };
}