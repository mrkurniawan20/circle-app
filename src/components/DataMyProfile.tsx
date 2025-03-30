import React from 'react';
import { loggedInUser } from '@/stores/loggedInUser';
import { NavLink } from 'react-router-dom';

interface LoggedInUser {
  name: string;
  username: string;
  bio: string;
  following: string;
  followers: string;
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
          <p className="text-slate-400 text-sm pb-1">{login.username}</p>
          <p className="text-gray-100 pb-1">{login.bio}</p>
          <div className="flex gap-5 pb-5">
            <div className="flex gap-2">
              <span className="text-gray-100">{login.following}</span>
              <p className="text-slate-400 hover:underline underline-offset-6">
                <NavLink to={'/follow'}>Following</NavLink>
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-100">{login.followers}</span>
              <p className="text-slate-400 hover:underline underline-offset-6">
                <NavLink to={'/followers'}>Followers</NavLink>
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DataMyProfile;
