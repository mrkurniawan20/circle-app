import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

interface AvatarSuggest {
  page: string;
  image: string;
  fallback: string;
  name: string;
  username: string;
  buttonType: 'follow' | 'followed';
}

function SuggestedAccount({ page, image, fallback, name, username, buttonType }: AvatarSuggest) {
  return (
    <NavLink to={`/${page}`} className="profile flex pb-3 pl-5 pr-5  hover:bg-slate-700">
      <Avatar className="my-auto">
        <AvatarImage src={`./src/assets/img/${image}.png`} alt="@shadcn" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className="pl-5">
        <h5 className="text-lg font-semibold text-gray-50">{name}</h5>
        <p className="text-slate-400 text-sm pb-1">@{username}</p>
      </div>
      <Button variant={buttonType === 'follow' ? 'follow' : 'followed'} className="rounded-full ms-auto my-auto">
        {buttonType === 'follow' ? 'Follow' : 'Following'}
      </Button>
    </NavLink>
  );
}

export default SuggestedAccount;
