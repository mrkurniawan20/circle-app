import React from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
import FollowButton from './FollowButton';
import { User, Users } from '@/utils/setUser';

// interface SearchResult {
//   image: string;
//   fallback: string;
//   name: string;
//   username: string;
//   bio: string;
//   buttonType: 'follow' | 'followed';
// }

// interface SearchProps {
//   searches: SearchResult[];
// }

function SearchResult({ user = [] }: Users) {
  const token = localStorage.getItem('token');
  return (
    <>
      {user.map((search, index) => (
        <CommandItem key={index} value={`${search.name} ${search.username} `} className="w-full data-[selected=true]:border-gray-600 data-[selected=true]:bg-accent-0 data-[selected=true]:text-accent-foreground">
          <NavLink to={`/${search.username}`} className="flex w-full pb-1 pt-1 pl-5 pr-5 hover:bg-slate-700 rounded-2xl">
            <Avatar className="my-auto">
              <AvatarImage src={`${search.avatar}`} alt="@shadcn" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="pl-5">
              <h5 className="text-base font-semibold text-gray-50">{search.name}</h5>
              <p className="text-slate-400 text-xs pb-1">@{search.username}</p>
              <p className="text-gray-200 text-xs pb-1">{search.bio}</p>
            </div>
            {/* <FollowButton id={search.id} /> */}
          </NavLink>
        </CommandItem>
      ))}
    </>
  );
}

export default SearchResult;
