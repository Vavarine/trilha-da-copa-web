import axios from "axios";
import { parseCookies } from "nookies";

export const getSpotifyApi = (ctx?: any) => {
  const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
  });

  const { "trilha.spotify_token": token } = parseCookies(ctx);
  if (token) {
    spotifyApi.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return spotifyApi;
};
