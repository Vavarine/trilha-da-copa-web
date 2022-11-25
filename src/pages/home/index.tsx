import { GetStickers } from "../../components/getStickers";
import { Header } from "../../components/Header";
import PageSlider from "../../components/PageSlider";
import { parseCookies } from 'nookies';

export default function Home() {
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
