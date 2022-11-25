import React from 'react';
import HTMLFlipBook from "react-pageflip";
import { useAuth } from '../contexts/AuthContext';
import { strapiApi } from '../services/strapiApi';
import { Page } from './Page';
import { useEffect, useState } from 'react';
import { Sticker } from '../global';

const PageSlider = () => {
  const [userStickers, setUserStickers] = useState([])

  const {user} = useAuth()
  console.log(user, "user")

  const getUserStickers = async () => {
    const {data: {data}} = await strapiApi.get(`/user-stickers?filters[email][$eq]=${user?.email}&populate=*`)
    console.log(data, 'data')

    const userStickerIds = data.map((item: any) => {
      return item.attributes.sticker.data.id
    })
    console.log(userStickerIds, 'IDs')
    
    const userStickers = await Promise.all( userStickerIds.map(async (id: number) => {
      const {data: {data: stickerData}} = await strapiApi.get(`/stickers/${id}?populate=*`)
      return stickerData
    }))
    console.log(userStickers, 'user stickers')
    setUserStickers(userStickers as any)
  }
  
  useEffect(() => {
    if (!user) return
    getUserStickers()
  }, [user])

  return (
      <HTMLFlipBook className='sticker-wrapper page' width={693} height={1031} >
        <div className='page cover'></div>
        <div className='page cover'>
          <img src="https://iili.io/HFzOiap.jpg" alt="Capa do álbum"/>
        </div>
        <div className='page back-cover'>
          <h2 className='back-cover-title'>
            Na trilha da copa 2022
          </h2>
        </div>
        <div className="page page-1">
          <Page 
            stickers = {
              userStickers.filter((sticker: Sticker) => {
                return sticker.attributes.category.data.attributes.name === 'Cup songs'
              })
            }
          />
        </div>
        <div className="page page-2">
          <Page />
        </div>
        <div className="page page-3">
          <Page />
        </div>
        <div className="page page-4">
          <Page />
        </div>
        <div className="page page-5">
          <Page />
        </div>
        <div className="page page-6">
          <Page />
        </div>
        <div className="page page-7">
          <Page />
        </div>
        <div className="page page-8">
          <Page />
        </div>
        <div className="page page-9">
          <Page />
        </div>
      </HTMLFlipBook>
  )
};

export default PageSlider;