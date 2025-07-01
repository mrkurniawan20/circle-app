import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import FollowButton from './FollowButton';
import LoadingPage from '@/layouts/components/LoadingPage';
import { User } from '@/utils/useUser';
import { api } from '@/services/api';

function SuggestedAccount() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');
  async function fetchData() {
    setLoading(true);
    try {
      const res = await api.get(`/user/getunfolloweduser`, {
        params: { limit: 5 },
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="flex flex-col gap-1 pb-4">
      {users.map((u) => (
        <div key={u.id} className="hover:bg-slate-700 duration-100">
          <NavLink to={`/profile/${u.username.toLowerCase()}`} className="flex items-center px-5 py-2 gap-3">
            <Avatar className="shrink-0">
              <AvatarImage src={u.avatar} alt="@user" className="object-cover" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h5 className="text-gray-50 font-semibold text-sm">{u.name}</h5>
              <p className="text-slate-400 text-xs">@{u.username}</p>
            </div>
            <FollowButton id={u.id} isFollowing={false} onFollow={fetchData} />
          </NavLink>
        </div>
      ))}
    </div>
  );
}

export default SuggestedAccount;
