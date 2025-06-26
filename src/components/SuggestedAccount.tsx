import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import FollowButton from './FollowButton';
import axios from 'axios';
import LoadingPage from '@/layouts/components/LoadingPage';
import { User } from '@/utils/useUser';

function SuggestedAccount() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:3320/user/getunfolloweduser', {
          params: {
            limit: 5,
          },
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <>
      {users.map((u, index) => (
        <div className="flex" key={index}>
          <NavLink to={`/profile/${u.username.toLocaleLowerCase()}`} className="profile flex py-2 px-5  w-full  hover:bg-slate-700 duration-100">
            <Avatar className="my-auto">
              <AvatarImage src={`${u.avatar}`} alt="@shadcn" className="object-cover" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="pl-5">
              <h5 className="text-lg font-semibold text-gray-50">{u.name}</h5>
              <p className="text-slate-400 text-sm pb-1">@{u.username}</p>
            </div>
            <FollowButton id={u.id} isFollowing={false} />
          </NavLink>
        </div>
      ))}
    </>
  );
}

export default SuggestedAccount;
