import { FormEvent, useState } from "react";
import { Sticker, UserSticker } from "../../../global";
import { strapiApi } from "../../../services/strapiApi";
import styles from "./styles.module.css";

interface StickerProps {
  sticker: Sticker;
  userStickers: UserSticker[];
}

export function EarnedSticker({ sticker, userStickers }: StickerProps) {
  const [hasTransferredSticker, setHasTransferredSticker] = useState(false);
  const [email, setEmail] = useState("");

  const isStickerDuplicated =
    userStickers.filter((userSticker) => userSticker.attributes.sticker.data.id === sticker.id)
      .length > 1;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userEarnedSticker = userStickers.find(
      (userSticker) => userSticker.attributes.sticker.data.id === sticker.id
    );

    if (!userEarnedSticker) return;

    console.log(userEarnedSticker);

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

  return (
    <div className={`${styles.container} ${isStickerDuplicated ? styles.duplicated : ""}`}>
      <img src={`http://localhost:1337${sticker.attributes.image.data.attributes.url}`} />

      {isStickerDuplicated && !hasTransferredSticker && (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email de um amigo"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Trocar</button>
        </form>
      )}

      {hasTransferredSticker && <p>Figurinha enviada!</p>}
    </div>
  );
}
