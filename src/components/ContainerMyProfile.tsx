import React from 'react';
import EditProfile from './EditProfile';
import DataMyProfile from './DataMyProfile';
import { loggedInUser } from '@/stores/loggedInUser';
import { NavLink } from 'react-router-dom';

function ContainerMyProfile() {
  return (
    <div className="first-profile-container bg-gray-800 pl-5 pr-5 rounded-xl relative">
      <div className="p-0 m-0 sm:max-w-fit">
        <NavLink to={'/profile'} className="">
          <h3 className="pt-3 pb-3 text-gray-100 text-xl font-semibold hover:underline underline-offset-6 sm:max-w-fit">My Profile</h3>
        </NavLink>
      </div>
      <img src="./src/assets/img/header-resized.png" alt="" className="aspect-5/1 overflow-hidden object-cover rounded-xl" />
      <img src="./src/assets/img/star platinum.png" alt="" className="size-20 aspect-square object-cover rounded-full border-5 border-gray-800 -mt-10 ml-4 absolute" />
      <div className="flex pt-3">
        <EditProfile />
      </div>
      <DataMyProfile loggedIn={loggedInUser} />
    </div>
  );
}

export default ContainerMyProfile;
