import { Header } from "../../components/Header";
import PageSlider from "../../components/PageSlider";
import { SliderData } from "../../components/SliderData";

export default function Home() {
    return (
        <div>
            <Header/>
            <PageSlider slides={SliderData} />
        </div>
    )
}