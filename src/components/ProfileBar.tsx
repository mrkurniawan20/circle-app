import React from 'react';
import { Button } from './ui/button';

function ProfileBar() {
  return (
    <div className="pl-10 pt-10">
      <div className="fixed pr-10">
        <div className="first-profile-container bg-gray-800 pl-5 pr-5 rounded-xl">
          <h3 className="pt-3 pb-3 text-gray-100 text-xl font-semibold">My Profile</h3>
          <img src="./src/assets/img/header.png" alt="" className="aspect-5/1 overflow-hidden object-cover rounded-xl" />
          <img src="./src/assets/img/star platinum.png" alt="" width="15%" className="aspect-square object-cover rounded-full border-3 -mt-10 ml-4 absolute" />
          <div className="flex pt-3">
            <Button className="ms-auto rounded-full">Edit Profile</Button>
          </div>
          <h2 className="text-gray-50 pb-1 text-2xl font-semibold">Dio Brando👊🏼</h2>
          <p className="text-slate-400 text-sm pb-1">@konodioda</p>
          <p className="text-gray-100 pb-1">IT IS ME! DIO! </p>
          <div className="flex gap-10 pb-5">
            <div className="flex gap-2">
              <span className="text-gray-100">1</span>
              <p className="text-slate-400">Following</p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-100">30M</span>
              <p className="text-slate-400">Followers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
