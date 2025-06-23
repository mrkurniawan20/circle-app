import React from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Button } from './ui/button';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
// import SearchResult from './SearchResult';
import { users } from '@/stores/users';
import SearchResult from '@/components/SearchResult';

function ContentSearch() {
  return (
    <div>
      <h2 className="text-2xl p-10 pb-5 text-gray-100 font-semibold">Search</h2>
      <Command className=" md:min-w-[450px] bg-[#213547] p-5 rounded-none ">
        <CommandInput defaultValue="" placeholder="Type a command or search..." className="bg-gray-600 text-gray-300 p-5 border-none rounded-full placeholder:text-gray-300 " />
        <CommandList className="max-h-full">
          <CommandEmpty className=" p-5 mt-20  mx-auto text-center">
            {' '}
            <h2 className="text-gray-100 text-2xl font-semibold">No results found.</h2> <p className="w-xs mx-auto text-slate-500 pt-3">Try searching for something else or check the spelling of what you typed</p>
          </CommandEmpty>
          <CommandGroup>
            <SearchResult searches={users} />
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default ContentSearch;
