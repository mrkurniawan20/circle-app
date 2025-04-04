import React from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';

interface SearchResult {
  page: string;
  image: string;
  fallback: string;
  name: string;
  username: string;
  bio: string;
  buttonType: 'follow' | 'followed';
}

interface SearchProps {
  searches: SearchResult[];
}

function SearchResult({ searches = [] }: SearchProps) {
  return (
    <>
      {searches.map((search) => (
        <CommandItem value={`${search.name} ${search.username} `} className="w-full data-[selected=true]:border-gray-600 data-[selected=true]:bg-accent-0 data-[selected=true]:text-accent-foreground">
          <NavLink to={`/${search.page}`} className="flex w-full pb-1 pt-1 pl-5 pr-5 hover:bg-slate-700 rounded-2xl">
            <Avatar className="my-auto">
              <AvatarImage src={`./src/assets/img/${search.image}.png`} alt="@shadcn" />
              <AvatarFallback>{search.fallback}</AvatarFallback>
            </Avatar>
            <div className="pl-5">
              <h5 className="text-base font-semibold text-gray-50">{search.name}</h5>
              <p className="text-slate-400 text-xs pb-1">@{search.username}</p>
              <p className="text-gray-200 text-xs pb-1">{search.bio}</p>
            </div>
            <Button variant={search.buttonType === 'follow' ? 'follow' : 'followed'} className="rounded-full ml-auto my-auto">
              {search.buttonType === 'follow' ? 'Follow' : 'Following'}
            </Button>
          </NavLink>
        </CommandItem>
      ))}
    </>
  );
}

export default SearchResult;
