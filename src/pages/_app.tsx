import "../styles/PageSlider.css";
import "../styles/Page.css";
import "../styles/home.css";
import "../styles/modal.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";

import "../styles/globals.css";
import { UserStickersProvider } from "../contexts/UserStickerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UserStickersProvider>
        <Component {...pageProps} />
      </UserStickersProvider>
    </AuthProvider>
  );
}
