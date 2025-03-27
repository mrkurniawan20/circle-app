import React from 'react';
import ContentPage from '@/components/ContentPage';

function PageMedia() {
  return (
    <div className="grid grid-cols-[1fr_0.4fr] h-screen">
      <div className="bg-gray-800 flex justify-center items-center">
        <img src="./src/assets/img/splash.jpg" className="my-auto" alt="" />
      </div>
      <div>
        <ContentPage />
      </div>
    </div>
  );
}

export default PageMedia;
