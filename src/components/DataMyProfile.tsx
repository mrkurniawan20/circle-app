import React from 'react';
import { loggedInUser } from '@/stores/loggedInUser';
import { NavLink } from 'react-router-dom';
import { usersFollowed } from '@/stores/users-followed';
import { users } from '@/stores/users';
interface LoggedInUser {
  name: string;
  username: string;
  bio: string;
}

interface LoggedInUserProps {
  loggedIn: LoggedInUser[];
}

function DataMyProfile({ loggedIn = [] }: LoggedInUserProps) {
  return (
    <>
      {loggedIn.map((login, index) => (
        <div key={index}>
          <h2 className="text-gray-50 pb-1 text-2xl font-semibold">{login.name}</h2>
          <p className="text-slate-400 text-sm pb-1">@{login.username}</p>
          <p className="text-gray-100 pb-1">{login.bio}</p>
          <div className="flex gap-5 pb-5">
            <div className="flex gap-2">
              <NavLink to={'/follow'}>
                <p className="text-slate-400 hover:underline underline-offset-6">
                  <span className="text-gray-100">{usersFollowed.length}</span> Following
                </p>
              </NavLink>
            </div>
            <div className="flex gap-2 hover:underline underline-offset-6">
              <NavLink to={'/followers'}>
                <p className="text-slate-400 hover:underline underline-offset-6">
                  <span className="text-gray-100">{users.length}</span> Followers
                </p>
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DataMyProfile;
