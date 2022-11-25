import React from 'react';
import HTMLFlipBook from "react-pageflip";
import { Page } from './Page';

const PageSlider = () => {
  return (
      <HTMLFlipBook className='sticker-wrapper page' width={900} height={850} >
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
      </HTMLFlipBook>
  )
};

export default PageSlider;