import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { User, useUser } from '@/utils/useUser';
import axios from 'axios';
import LoadingPage from './LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FollowButton from '@/components/FollowButton';

function ContentFollowing() {
  const token = localStorage.getItem('token');
  const { user } = useUser();
  const { username } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3320/user/getfollowing/${username}`, { headers: { Authorization: `Bearer ${token}` } });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <div>
      <h2 className="text-2xl p-10 pb-5 text-gray-100 font-semibold">Follows</h2>
      <div className="grid grid-cols-[1fr_1fr]  pr-5 pl-5 border-b-1 border-gray-500">
        <NavLink to={`/following/${username}`} className="text-center text-xl text-gray-50">
          <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-200">Following</p>
          <div className="bg-green-500 border-2 border-green-500 h-1 rounded-full"></div>
        </NavLink>
        <NavLink to={`/followers/${username}`} className="text-center text-xl text-gray-50 ">
          <p className="pt-3 pb-3   hover:bg-slate-700 rounded-lg duration-200">Followers</p>
        </NavLink>
      </div>
      <div className="p-5">
        {users.map((follower, index) => (
          <NavLink key={index} to={`/profile/${follower.username}`} className="flex w-full pb-1 pt-1 px-5 hover:bg-slate-700 rounded-2xl duration-200">
            <Avatar className="my-auto">
              <AvatarImage src={`${follower.avatar}`} alt="@shadcn" className="object-cover" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="pl-5">
              <h5 className="text-base font-semibold text-gray-50">{follower.name}</h5>
              <p className="text-slate-400 text-xs pb-1">@{follower.username}</p>
              <p className="text-gray-200 text-xs pb-1">{follower.bio}</p>
            </div>
            {user.username !== follower.username && <FollowButton id={follower.id} isFollowing={follower.isFollowingBack} />}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ContentFollowing;
