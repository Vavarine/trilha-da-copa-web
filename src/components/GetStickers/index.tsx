import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { Sticker, UserSticker } from "../../global";
import { strapiApi } from "../../services/strapiApi";
import { parseCookies, setCookie } from "nookies";
import styles from "./styles.module.css";
import { EarnedSticker } from "./EarnedSticker";

export function GetStickers() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [retrievedStickers, setRetrievedStickers] = useState<Sticker[]>([]);
  const [hasAlreadyRetrievedStickers, setHasAlreadyRetrievedStickers] = useState(true);
  const [userStickers, setUserStickers] = useState<UserSticker[]>([]);

  const { user } = useAuth();

  const getUserStickersIds = async () => {
    if (!user) return [];

    const {
      data: { data },
    } = await strapiApi.get(`/user-stickers?filters[email][$eq]=${user.email}&populate=*`);

    setUserStickers(data);
  };

  const getAvailableStickers = async () => {
    const {
      data: { data },
    } = await strapiApi.get("/stickers?populate=*");

    return data;
  };

  const retrieveStickers = async () => {
    const availableStickers = await getAvailableStickers();
    const isUserPremium = user?.product === "premium";

    const stickersToRetrieve = new Array(isUserPremium ? 4 : 3)
      .fill(0)
      .map(() => availableStickers[Math.floor(Math.random() * availableStickers.length)]);

    setRetrievedStickers(stickersToRetrieve);
    setHasAlreadyRetrievedStickers(true);

    saveRetrievedStickers(stickersToRetrieve);

    setCookie(undefined, "trilha.has_retrieved", "true", {
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
  };

  const saveRetrievedStickers = async (stickersToSave: Sticker[]) => {
    stickersToSave.forEach(async (sticker) => {
      await strapiApi.post("/user-stickers", {
        data: {
          email: user?.email,
          sticker: sticker.id,
        },
      });
    });
  };

  const handleOpenPupUp = () => {
    setIsPopUpOpen(true);
  };

  const handleClosePopUp = () => {
    setRetrievedStickers([]);
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    getUserStickersIds();
    getAvailableStickers();
    setHasAlreadyRetrievedStickers(!!parseCookies()["trilha.has_retrieved"]);
  }, [user]);

  return (
    <>
      <button onClick={handleOpenPupUp} className={styles.getStickers}>
        <span>Obter Figurinhas</span>
        <img src="https://iili.io/H3Sr3oG.png" alt="" />
      </button>
      {isPopUpOpen && (
        <div className={styles.pupup}>
          <button onClick={handleClosePopUp} className={styles.close}>
            <FiX size={24} color="#22C55E" />
          </button>
          <div className={styles.stickersContainer}>
            {retrievedStickers.map((sticker) => (
              <EarnedSticker key={sticker.id} sticker={sticker} userStickers={userStickers} />
            ))}
          </div>
          <img src="https://iili.io/HFxER3u.png" alt="" />
          <span>
            Você pode resgatar um pacote de figurinhas por dia Já garantiu o seu? Clique no botão
            abaixo e viaje ao redor do mundo com a seleção de músicas do Spotify exclusivas para a
            copa do mundo 2022
          </span>
          {!hasAlreadyRetrievedStickers ? (
            <button onClick={retrieveStickers} className={styles.retrieve}>
              Resgatar pacote
            </button>
          ) : (
            <button onClick={retrieveStickers} className={styles.retrieve} disabled>
              Pacote resgatado
            </button>
          )}
        </div>
      )}
    </>
  );
}
