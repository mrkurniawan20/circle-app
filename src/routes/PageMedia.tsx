import React, { useState } from 'react';
import ContentPage from '@/components/ContentPage';
import PageContent from '@/components/ContentPage';
import { CircleX, PanelRight } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function PageMedia() {
  const [imageOnly, setImageOnly] = useState(true);
  return (
    <div className="flex h-screen w-full">
      <div className={`bg-gray-800 flex justify-center items-center relative transition-all duration-200 ${imageOnly ? 'flex-[1]' : 'flex-[1_1_100%]'}`}>
        <NavLink to={'/'}>
          <CircleX className="absolute text-gray-50 left-10 top-10 hover:bg-gray-600 size-10 p-2 rounded-full" />
        </NavLink>
        <PanelRight onClick={() => setImageOnly((prev) => !prev)} className="absolute text-gray-50 right-10 top-10 hover:bg-gray-600 size-10 p-2 rounded-full hover:cursor-pointer" />
        <img src="./src/assets/img/cars7.jpg" className="my-auto max-h-screen max-w-screen" alt="" />
      </div>
      {imageOnly && (
        <div className="min-w-0 flex-[0.4] transition-all">
          <PageContent showNavLink={false} />
        </div>
      )}
    </div>
  );
}

export default PageMedia;
