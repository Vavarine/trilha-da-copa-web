import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../../contexts/AuthContext";
import { useUserStickers } from "../../contexts/UserStickerContext";
import { UserSticker } from "../../global";
import { strapiApi } from "../../services/strapiApi";

import styles from "./styles.module.css";

export function ProgressBar() {
  const { userStickers } = useUserStickers();

  const useStickersIds = userStickers.map(
    (userSticker: UserSticker) => userSticker.attributes.sticker.data.id
  );

  const uniqueUserStickersQtd = Array.from(new Set(useStickersIds)).length;
  const completionPercentage = (uniqueUserStickersQtd / 28) * 100;

  return (
    <div className={styles.container}>
      <h4>Seu progresso</h4>
      <div>
        <CircularProgressbar
          value={completionPercentage}
          text={`${uniqueUserStickersQtd} / 32`}
          styles={buildStyles({
            pathColor: `#23ca5d`,
            textColor: "#fff",
            trailColor: "#bbbbbb",
          })}
        />
      </div>
    </div>
  );
}
