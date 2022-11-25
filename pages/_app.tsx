import '../styles/globals.css'
import '../styles/PageSlider.css';
import '../styles/Page.css'
import "../styles/globals.css";
import "../styles/home.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
