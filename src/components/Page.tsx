import { Sticker } from "../global"

interface PageProps {
    stickers?: Sticker[]
    text?: string
    bgImgUrl?: string
    stickerQt?: number
}

export function Page({stickers = [], text, bgImgUrl, stickerQt = 4}: PageProps) {
    console.log(stickers, 'sticker filter')
    const repeatStickerMap = new Map()

    stickers.forEach((item) => {
        repeatStickerMap.set(item.id, item)
    })

    const repeatSticker = Array.from(repeatStickerMap, ([name, valor]) => {
        return valor
    })

    return (
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
    )
}