import React from 'react';
import { loggedInUser } from '@/stores/loggedInUser';

interface LoggedInUser {
  name: string;
  username: string;
  bio: string;
  following: string;
  followers: string;
}

function DataMyProfile({ name, username, bio, following, followers }: LoggedInUser) {
  return (
    <div>
      <h2 className="text-gray-50 pb-1 text-2xl font-semibold">{name}</h2>
      <p className="text-slate-400 text-sm pb-1">@{username}</p>
      <p className="text-gray-100 pb-1">{bio}</p>
      <div className="flex gap-5 pb-5">
        <div className="flex gap-2">
          <span className="text-gray-100">{following}</span>
          <p className="text-slate-400">Following</p>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-100">{followers}</span>
          <p className="text-slate-400">Followers</p>
        </div>
      </div>
    </div>
  );
}

export default DataMyProfile;
