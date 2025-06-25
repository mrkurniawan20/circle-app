import React from 'react';
import { loggedInUser } from '@/stores/loggedInUser';
import { NavLink } from 'react-router-dom';
import { usersFollowed } from '@/stores/users-followed';
import { users } from '@/stores/users';
import { User } from '@/utils/setUser';

interface LoggedInUserProps {
  loggedIn: User;
}

function DataMyProfile({ loggedIn }: LoggedInUserProps) {
  return (
    <>
      <div>
        <h2 className="text-gray-50 pb-1 mt-5 text-2xl font-semibold">{loggedIn.name}</h2>
        <p className="text-slate-400 text-sm pb-1">@{loggedIn.username}</p>
        <p className="text-gray-100 pb-1">{loggedIn.bio}</p>
        <div className="flex gap-5 pb-5">
          <div className="flex gap-2">
            <NavLink to={'/follow'}>
              <p className="text-slate-400 hover:underline underline-offset-6">
                <span className="text-gray-100">{loggedIn.followingCount}</span> Following
              </p>
            </NavLink>
          </div>
          <div className="flex gap-2 hover:underline underline-offset-6">
            <NavLink to={'/followers'}>
              <p className="text-slate-400 hover:underline underline-offset-6">
                <span className="text-gray-100">{loggedIn.followersCount}</span> Followers
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default DataMyProfile;
