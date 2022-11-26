import "../styles/PageSlider.css";
import "../styles/Page.css";
import "../styles/home.css";
import "../styles/modal.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";

import "../styles/globals.css";
import { UserStickersProvider } from "../contexts/UserStickerContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Trilha da Copa | 2022</title>
      </Head>
      <UserStickersProvider>
        <Component {...pageProps} />
      </UserStickersProvider>
    </AuthProvider>
  );
}
