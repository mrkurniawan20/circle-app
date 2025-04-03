import React, { useState } from 'react';
import ContentPage from '@/layouts/components/ContentPage';
import { CircleX, PanelRight } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ContentPageMedia from '@/layouts/components/ContentPageMedia';
import { threads } from '@/stores/threads';

function PageMedia() {
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state?.index ?? 1;
  console.log(location);
  // image = location.state?.image || 'splash.jpg';
  const [imageOnly, setImageOnly] = useState(true);

  return (
    <div className="flex h-screen w-full relative">
      <div className={`bg-gray-800 border-r-1 border-gray-500 flex justify-center items-center relative transition-all duration-200 ${imageOnly ? 'flex-[1] duration-300' : 'flex-[1_1_100%] duration-1000'}`}>
        <CircleX className="absolute text-gray-50 left-10 top-10 hover:bg-gray-600 hover:cursor-pointer size-10 p-2 rounded-full" onClick={() => navigate(-1)} />
        <PanelRight onClick={() => setImageOnly((show) => !show)} className="absolute text-gray-50 right-10 top-10 hover:bg-gray-600 size-10 p-2 rounded-full hover:cursor-pointer" />
        <img src={`./src/assets/img/${threads[index].threadImage}`} className="my-auto max-h-full max-w-full absolute" alt="" />
      </div>
      {imageOnly && (
        <div className="min-w-0 flex-[0.4] transition-all overflow-y-scroll duration-1000">
          <ContentPageMedia />
        </div>
      )}
    </div>
  );
}

export default PageMedia;
