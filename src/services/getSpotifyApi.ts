import axios from "axios";
import { parseCookies } from "nookies";

export const getSpotifyApi = (ctx?: any) => {
  const { "trilha.spotify_token": token } = parseCookies(ctx);

  const spotifyApi = axios.create({
    baseURL: "https://api.spotify.com/v1",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // if (token) {
  //   spotifyApi.defaults.headers.Authorization = `Bearer ${token}`;
  // }

  return spotifyApi;
};
