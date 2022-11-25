import { GetStickers } from "../../components/getStickers";
import { Header } from "../../components/Header";
import PageSlider from "../../components/PageSlider";

export default function Home() {
  return (
    <div>
      <Header />
      <PageSlider />
      <GetStickers />
    </div>
  );
}
