import Head from "next/head";
import Image from "next/image";
import { useAuth } from "../contexts/AuthContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      {user ? (
        <div>
          <h1>Olá {user.display_name}</h1>
          {/* <Image src={user.images[0].url} width={200} height={200} /> */}
        </div>
      ) : (
        <h1>Olá, faça login com o spotify</h1>
      )}
      <h1>Home</h1>
    </div>
  );
}
