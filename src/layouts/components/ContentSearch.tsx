import React, { useEffect, useState } from 'react';
import { Calculator, Calendar, CreditCard, Settings, Smile } from 'lucide-react';
import { NavLink } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Button } from './ui/button';

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from '@/components/ui/command';
// import SearchResult from './SearchResult';
import { users } from '@/stores/users';
import SearchResult from '@/components/SearchResult';
import { User, Users } from '@/utils/setUser';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FollowedButton from '@/components/FollowedButton';

function ContentSearch() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:3320/user/getUsers');
        setUsers(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log(users);
  if (loading) return <LoadingPage />;
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
            {users.map((u) => (
              <CommandItem value={`${u.name} ${u.username} `} className="w-full data-[selected=true]:border-gray-600 data-[selected=true]:bg-accent-0 data-[selected=true]:text-accent-foreground">
                <NavLink to={`/${u.id}`} className="flex w-full pb-1 pt-1 pl-5 pr-5 hover:bg-slate-700 rounded-2xl">
                  <Avatar className="my-auto">
                    <AvatarImage src={`./src/uploads/${u.avatar}`} alt="@shadcn" />
                    <AvatarFallback>ZW</AvatarFallback>
                  </Avatar>
                  <div className="pl-5">
                    <h5 className="text-base font-semibold text-gray-50">{u.name}</h5>
                    <p className="text-slate-400 text-xs pb-1">@{u.username}</p>
                    <p className="text-gray-200 text-xs pb-1">{u.bio}</p>
                  </div>
                  <FollowedButton />
                </NavLink>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default ContentSearch;
