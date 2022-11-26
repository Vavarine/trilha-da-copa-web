import { Sticker } from "../global"

interface PageProps {
    stickers?: Sticker[]
    text?: string
    country?: string
    description?: string
    stickerQt?: number
    image?: string
}

export function Page({stickers = [], text, country, description, stickerQt = 4, image}: PageProps) {
    const repeatStickerMap = new Map()

    stickers.forEach((item) => {
        repeatStickerMap.set(item.id, item)
    })

    const repeatSticker = Array.from(repeatStickerMap, ([name, valor]) => {
        return valor
    })

    return (
        <div className="sticker-container">
            <div className="sticker-text">{text}</div>
             <div className="sticker-wrapper">
            {
                repeatSticker.map(sticker => (
                    <div className="sticker">
                        <img src={`http://localhost:1337${sticker.attributes.image.data.attributes.url}`}/>
                    </div>
                ))
            }
            {
                new Array(stickerQt - repeatSticker.length).fill("0").map(sticker => (
                    <div className="sticker">
                    </div>
                ))
            }
            </div>
            <div className="sponsor-logo"><img src={image}/></div>
            <div className="sticker-country">{country}</div>
            <div className="sticker-description">{description}</div>
        </div>
    )
}