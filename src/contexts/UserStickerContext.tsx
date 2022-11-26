import { setCookie, parseCookies } from "nookies";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserSticker } from "../global";
import { getSpotifyApi } from "../services/getSpotifyApi";
import { strapiApi } from "../services/strapiApi";
import { useAuth } from "./AuthContext";

interface IUserStickersContext {
  userStickers: UserSticker[];
  updateUserStickers: () => void;
}

const UserStickersContext = createContext({} as IUserStickersContext);

export const UserStickersProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);

  const updateUserStickers = async () => {
    if (!user) return [];

    const {
      data: { data },
    } = await strapiApi.get(`/user-stickers?filters[email][$eq]=${user.email}&populate=*`);

    setUserStickers(data);
  };

  useEffect(() => {
    updateUserStickers();
  }, [user]);

  return (
    <UserStickersContext.Provider value={{ userStickers, updateUserStickers }}>
      {children}
    </UserStickersContext.Provider>
  );
};

export function useUserStickers() {
  return useContext(UserStickersContext);
}
