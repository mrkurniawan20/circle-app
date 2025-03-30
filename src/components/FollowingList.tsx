import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import FollowButton from './FollowButton';
import FollowedButton from './FollowedButton';

interface FollowersList {
  page: string;
  image: string;
  fallback: string;
  name: string;
  username: string;
  bio: string;
  buttonType: 'follow' | 'followed';
}

interface FollowersProps {
  followers: FollowersList[];
}

function FollowingList({ followers = [] }: FollowersProps) {
  return (
    <div className="p-5">
      {followers.map((follower) => (
        <NavLink to={`/${follower.page}`} className="flex w-full pb-1 pt-1 px-5 hover:bg-slate-700 rounded-2xl duration-200">
          <Avatar className="my-auto">
            <AvatarImage src={`./src/assets/img/${follower.image}.png`} alt="@shadcn" />
            <AvatarFallback>{follower.fallback}</AvatarFallback>
          </Avatar>
          <div className="pl-5">
            <h5 className="text-base font-semibold text-gray-50">{follower.name}</h5>
            <p className="text-slate-400 text-xs pb-1">@{follower.username}</p>
            <p className="text-gray-200 text-xs pb-1">{follower.bio}</p>
          </div>
          <FollowedButton />
        </NavLink>
      ))}
    </div>
  );
}

export default FollowingList;
