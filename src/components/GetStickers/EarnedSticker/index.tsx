import { FormEvent, useState } from "react";
import { Sticker, UserSticker } from "../../../global";
import { strapiApi } from "../../../services/strapiApi";
import styles from "./styles.module.css";
import Modal from "react-modal";

interface StickerProps {
  sticker: Sticker;
  userStickers: UserSticker[];
}

export function EarnedSticker({ sticker, userStickers }: StickerProps) {
  const [hasTransferredSticker, setHasTransferredSticker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const isStickerDuplicated =
    userStickers.filter((userSticker) => userSticker.attributes.sticker.data.id === sticker.id)
      .length > 1;

  const handleExchange = async () => {
    const userEarnedSticker = userStickers.find(
      (userSticker) => userSticker.attributes.sticker.data.id === sticker.id
    );

    if (!userEarnedSticker) return;

    try {
      await strapiApi.delete(`/user-stickers/${userEarnedSticker.id}`);
      await strapiApi.post("/user-stickers", {
        data: {
          email,
          sticker: sticker.id,
        },
      });

      setHasTransferredSticker(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`${styles.container} ${isStickerDuplicated ? styles.duplicated : ""}`}>
      <img src={`http://localhost:1337${sticker.attributes.image.data.attributes.url}`} />

      {isStickerDuplicated && !hasTransferredSticker && (
        <div className={styles.content}>
          <input
            type="email"
            placeholder="Email de um amigo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={handleModalOpen}>
            Trocar
          </button>
          <Modal isOpen={isModalOpen} onRequestClose={handleModalClose}>
            <div className={styles.modal}>
              <p>Confirmar o envio da figurinha?</p>
              <div>
                <button className={styles.cancel} onClick={handleModalClose}>
                  cancelar
                </button>
                <button onClick={handleExchange}>Sim</button>
              </div>
            </div>
          </Modal>
          {/* {isModalOpen && (
            <div className={styles.modal}>
              <div className={styles.backdrop}></div>
            </div>
          )} */}
        </div>
      )}

      {hasTransferredSticker && <p>Figurinha enviada!</p>}
    </div>
  );
}
