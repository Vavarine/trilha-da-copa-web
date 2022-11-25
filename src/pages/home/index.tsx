import { GetStickers } from "../../components/getStickers";
import { Header } from "../../components/Header";
import PageSlider from "../../components/PageSlider";
import { parseCookies } from 'nookies';
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const {user} = useAuth()
  
  useEffect(() => {
    console.log(user, 'user home')
  }, [user])

  return (
    <div>
      <Header />
      <PageSlider />
      <GetStickers />
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const { "trilha.spotify_token": token } = parseCookies(ctx);
  if (!token) return{redirect:{destination: "/auth", permanent: false}}
  
  return{props: {}}
}
