import { Header } from "../components/Header";
import PageSlider from "../components/PageSlider";
import { SliderData } from "../components/SliderData";

export function HomePage() {
    return (
        <div>
            <Header/>
            <PageSlider slides={SliderData} />
        </div>
    )
}