import DataMyProfile from '@/components/DataMyProfile';
import EditProfile from '@/components/EditProfile';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import ThreadList from '@/components/ThreadList';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { threads } from '@/stores/threads';
import Layout from '@/layouts/Layout';
import { images } from '@/stores/images';
import { loggedInUser } from '@/stores/loggedInUser';

function ProfileMedia() {
  const navigate = useNavigate();

  return (
    <Layout showProfileContainer={false}>
      <div
        className="main-content  border-collapse"
        // style={{
        //   height: '10000px',
        // }}
      >
        <div className="inline-flex">
          <NavLink to={'/home'} className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
              <img src="./src/assets/img/back.png" className="invert w-6 h-6" alt="" />
              <h2 className="text-2xl text-gray-100 font-semibold">{loggedInUser.name}</h2>
            </div>
          </NavLink>
        </div>
        <div className="p-10 pt-2">
          <img src="./src/assets/img/header-resized.png" alt="" className="aspect-5/1  object-cover  rounded-2xl" />
          <img src="./src/assets/img/star platinum.png" alt="" className="aspect-square object-cover size-25 rounded-full border-5 border-[#213547] ml-10 -mt-12 absolute" />
          <div className="flex pt-3 pb-5">
            <EditProfile />
          </div>
          <DataMyProfile name={loggedInUser.name} username={loggedInUser.username} bio={loggedInUser.bio} following={loggedInUser.following} followers={loggedInUser.followers} />
        </div>
        <div className="grid grid-cols-[1fr_1fr]  pr-5 pl-5 border-b-1 border-gray-500">
          <NavLink to={'/profile'} className="text-center text-xl text-gray-50 ">
            <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-150">All Post</p>
          </NavLink>
          <NavLink to={'/profilemedia'} className="text-center text-xl text-gray-50">
            <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-150">Media</p>
            <div className="border-2 border-green-500 h-1 rounded-full"></div>
          </NavLink>
        </div>
        <div className="grid grid-cols-3 gap-2 p-2">
          {images.map((img, index) => (
            <div onClick={() => navigate('/media', { state: { image: img.image } })}>
              <img key={index} src={`./src/assets/img/${img.image}`} alt="" className="rounded-lg aspect-square object-cover hover:brightness-75 hover:cursor-pointer" />
            </div>
            // <NavLink to={'/media'}>
            // </NavLink>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ProfileMedia;
