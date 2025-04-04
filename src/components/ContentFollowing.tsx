import React from 'react';
import { NavLink } from 'react-router-dom';
// import { users } from '@/stores/users';
import { usersFollowed } from '@/stores/users-followed';
import FollowersList from './FollowersList';
import { users } from '@/stores/users';

function ContentFollowing() {
  return (
    <div
      className="main-content "
      // style={{
      //   height: '10000px',
      // }}
    >
      <h2 className="text-2xl p-10 pb-5 text-gray-100 font-semibold">Follows</h2>
      <div className="grid grid-cols-[1fr_1fr]  pr-5 pl-5 border-b-1 border-gray-500">
        <NavLink to={'/follow'} className="text-center text-xl text-gray-50 ">
          <p className="pt-3 pb-3   hover:bg-slate-700 rounded-lg duration-200">Followers</p>
        </NavLink>
        <NavLink to={'/following'} className="text-center text-xl text-gray-50">
          <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-200">Following</p>
          <div className="border-2 border-green-500 h-1 rounded-full"></div>
        </NavLink>
      </div>
      <FollowersList followers={usersFollowed} />
    </div>
  );
}

export default ContentFollowing;
