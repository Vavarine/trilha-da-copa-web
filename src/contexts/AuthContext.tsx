import { setCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../global";
import { getSpotifyApi } from "../services/getSpotifyApi";

interface IAuthContext {
  spotifyToken?: string;
  setSpotifyToken: (token: string) => void;
  user?: User;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [spotifyToken, setSpotifyToken] = useState<string>();
  const [user, setUser] = useState<User>();

  const setSpotifyTokenCookie = (token: string) => {
    setCookie(undefined, "trilha.spotify_token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
  };

  const getSpotifyUser = async () => {
    const spotifyApi = getSpotifyApi(spotifyToken);

    try {
      const { data } = await spotifyApi.get("/me");
      setUser(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (spotifyToken) {
      setSpotifyTokenCookie(spotifyToken);
    }
  }, [spotifyToken]);

  useEffect(() => {
    if (spotifyToken) {
      getSpotifyUser();
    }
  }, [spotifyToken]);

  useEffect(() => {
    const { "trilha.spotify_token": spotifyToken } = parseCookies();

    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
    }
  }, []);

  useEffect(() => {
    if (spotifyToken) {
      setSpotifyToken(spotifyToken);
    }
  }, [setSpotifyToken, spotifyToken]);

  return (
    <AuthContext.Provider value={{ user, spotifyToken, setSpotifyToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
