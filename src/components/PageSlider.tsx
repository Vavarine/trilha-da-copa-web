import React from 'react';
import HTMLFlipBook from "react-pageflip";
import { Page } from './Page';



const PageSlider = () => {

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
          <Page />
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