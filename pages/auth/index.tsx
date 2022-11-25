import axios from "axios";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { generateRandomString } from "../../utils/generateRandomString";
import { getHashParams } from "../../utils/getHashParams";

export default function Auth() {
  const router = useRouter();
  const { setSpotifyToken } = useAuth();
  const { asPath } = router;
  const hashParams = getHashParams(asPath);

  console.log("hashParams", hashParams);

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

  return <button onClick={handleButtonClick}>Logue com o spotify</button>;
}
