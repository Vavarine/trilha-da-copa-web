import { useState } from "react";
import styles from "./styles.module.css";

export function GetStickers() {
  const [stickers, setStickers] = useState([]);

  function getStickers() {}

  return (
    <button className={styles.getStickers}>
      <span>Obter Figurinhas</span>
      <img src="https://iili.io/H3Sr3oG.png" alt="" />
    </button>
  );
}
