import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useAuth } from "../../contexts/AuthContext";
import { generateRandomString } from "../../utils/generateRandomString";
import { getHashParams } from "../../utils/getHashParams";

import styles from "./styles.module.css";

export default function Auth() {
  const router = useRouter();
  const { setSpotifyToken } = useAuth();
  const { asPath } = router;
  const hashParams = getHashParams(asPath);

  if (hashParams.access_token) {
    setSpotifyToken(hashParams.access_token);

    router.push("/");
  }

  const handleButtonClick = () => {
    const client_id = "c34fd2df3b2f4675b52a73ed08fdad10"; // Your client id
    const redirect_uri = "http://localhost:3000/auth"; // Your redirect uri

    const state = generateRandomString(16);

    localStorage.setItem("spotify_auth_state", state);
    const scope = "user-read-private user-read-email";

    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    router.push(url);
  };

  return (
    <div className={styles.container}>
      <div>
        <h1>Cadastre-se</h1>
        <p>
          E garanta o albúm que vai fazer você viajar com as melhores músicas de cada país
          participante da Copa do mundo 2022
        </p>
        <button onClick={handleButtonClick}>Conecte sua conta do Spotify</button>
      </div>
      <img src="https://iili.io/H384mR1.png" />
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const { "trilha.spotify_token": token } = parseCookies(ctx);
  if (token) return { redirect: { destination: "/home", permanent: false } };

  return { props: {} };
}
