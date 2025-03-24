import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Profile() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <div className="main-content border-l-1 border-r-1 border-gray-500 border-collapse">
        <div className="inline-flex">
          <NavLink to={'/home'} className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
              <img src="./src/assets/img/back.png" className="invert w-6 h-6" alt="" />
              <h2 className="text-2xl text-gray-100 font-semibold">Dio Brando 👊🏼</h2>
            </div>
          </NavLink>
        </div>
        <div className="p-10">
          <img src="./src/assets/img/header-resized.png" alt="" />
          <img src="./src/assets/img/star platinum.png" alt="" />
        </div>
      </div>
      <ProfileBar showProfileContainer={false} />
    </div>
  );
}

export default Profile;
