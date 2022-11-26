import { GetStickers } from "../../components/GetStickers";
import { Header } from "../../components/Header";
import PageSlider from "../../components/PageSlider";
import { parseCookies } from "nookies";
import { ProgressBar } from "../../components/ProgressBar";

export default function Home() {
  return (
    <div>
      <Header />
      <PageSlider />
      <GetStickers />
      <ProgressBar />
    </div>
  );
}

export async function getServerSideProps(ctx: any) {
  const { "trilha.spotify_token": token } = parseCookies(ctx);
  if (!token) return { redirect: { destination: "/auth", permanent: false } };

  return { props: {} };
}
