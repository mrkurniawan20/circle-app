import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import FollowButton from './FollowButton';

interface AvatarSuggest {
  image: string;
  fallback: string;
  name: string;
  username: string;
  buttonType: 'follow' | 'followed';
}

interface SuggestedProps {
  avatars: AvatarSuggest[];
}

function SuggestedAccount({ avatars = [] }: SuggestedProps) {
  const [follow, setFollow] = useState<boolean>(false);

  const toggleFollow = () => {
    setFollow(!follow);
  };
  return (
    <>
      {avatars.map((avatar, index) => (
        <div className="flex" key={index}>
          <NavLink to={`/${avatar.username.toLocaleLowerCase()}`} className="profile flex py-2 px-5  w-full  hover:bg-slate-700 duration-100">
            <Avatar className="my-auto">
              <AvatarImage src={`./src/assets/img/${avatar.image}.png`} alt="@shadcn" />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
            <div className="pl-5">
              <h5 className="text-lg font-semibold text-gray-50">{avatar.name}</h5>
              <p className="text-slate-400 text-sm pb-1">@{avatar.username}</p>
            </div>
            <FollowButton />
          </NavLink>
        </div>
      ))}
    </>
  );
}

export default SuggestedAccount;
