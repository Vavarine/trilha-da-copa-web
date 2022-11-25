import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { Sticker } from "../../global";
import { strapiApi } from "../../services/strapiApi";
import { parseCookies, setCookie } from "nookies";
import styles from "./styles.module.css";

export function GetStickers() {
  const { user } = useAuth();
  const [retrievedStickers, setRetrievedStickers] = useState<Sticker[]>([]);
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);
  const [hasAlreadyRetrievedStickers, setHasAlreadyRetrievedStickers] = useState(true);

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
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    getAvailableStickers();
    setHasAlreadyRetrievedStickers(!!parseCookies()["trilha.has_retrieved"]);
  }, []);

  // useEffect(() => {
  //   saveRetrievedStickers(retrievedStickers);
  // }, [retrievedStickers]);

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
              <img
                key={sticker.id}
                src={`http://localhost:1337${sticker.attributes.image.data.attributes.url}`}
              />
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
