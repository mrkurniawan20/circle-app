import React from 'react';
import EditProfile from './EditProfile';
import DataMyProfile from './DataMyProfile';
import { loggedInUser } from '@/stores/loggedInUser';

function ContainerMyProfile() {
  return (
    <div className="first-profile-container bg-gray-800 pl-5 pr-5 rounded-xl relative">
      <h3 className="pt-3 pb-3 text-gray-100 text-xl font-semibold">My Profile</h3>
      <img src="./src/assets/img/header-resized.png" alt="" className="aspect-5/1 overflow-hidden object-cover rounded-xl" />
      <img src="./src/assets/img/star platinum.png" alt="" width="15%" className="aspect-square object-cover rounded-full border-5 border-gray-800 -mt-10 ml-4 absolute" />
      <div className="flex pt-3">
        <EditProfile />
      </div>
      <DataMyProfile loggedIn={loggedInUser} />
    </div>
  );
}

export default ContainerMyProfile;
