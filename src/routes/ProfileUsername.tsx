import DataMyProfile from '@/components/DataMyProfile';
import EditProfile from '@/components/EditProfile';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import { User, useUser } from '@/utils/useUser';
import { TweetList } from '@/components/ListTweet';
import { Tweet } from '@/utils/setTweets';
import LoadingPage from '@/layouts/components/LoadingPage';
import FollowButton from '@/components/FollowButton';
import { api } from '@/services/api';

function ProfileUsername() {
  const token = localStorage.getItem('token');
  const { username } = useParams();
  const { user, loading } = useUser();

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [tweet, setTweet] = useState<Tweet[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await api.get(`/user/getuser/${username}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const resTweet = await api.get(`/post/gettweetbyusername/${resUser.data.username}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        setProfileUser(resUser.data);
        setTweet(resTweet.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [username, token]);

  if (loading || profileUser == null) return <LoadingPage />;
  const isLoggedIn = user.id !== 0;
  console.log(isMobile);

  const InnerContent = (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 min-h-screen border-r-1 border-l-1 border-gray-500">
      {isLoggedIn && (
        <div className="flex justify-between items-center">
          <NavLink to="/home" className="flex items-center gap-3 pt-6 pb-2 hover:bg-slate-700 rounded-full px-4 w-fit">
            <ArrowLeft className="size-6 text-gray-50" />
            <div>
              <h2 className="text-xl font-semibold text-gray-100">{profileUser.name}</h2>
              <p className="text-sm text-slate-400">{profileUser.tweetCount} tweets</p>
            </div>
          </NavLink>
          <NavLink to={'/edit'} className="flex items-center p-2 hover:bg-slate-700 rounded-full px-4 w-fit">
            <h2 className="text-sm text-slate-400">Edit Password</h2>
          </NavLink>
        </div>
      )}

      <div className="relative pt-3">
        <Dialog>
          <DialogTrigger asChild>
            <img src={profileUser.header} alt="" className="aspect-[5/1] object-cover w-full rounded-2xl cursor-pointer" />
          </DialogTrigger>
          <DialogOverlay className="bg-black/80" />
          <DialogContent className="border-none p-1 rounded-none">
            <img src={profileUser.header} alt="" className="aspect-[5/1] object-cover w-full" />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <img src={profileUser.avatar} alt="" className="size-24 object-cover rounded-full border-4 border-[#213547] absolute -bottom-12 left-4 cursor-pointer hover:brightness-90 transition" />
          </DialogTrigger>
          <DialogOverlay className="bg-black/80" />
          <DialogContent className="border-none w-fit p-1 rounded-full">
            <img src={profileUser.avatar} alt="" className="size-full object-cover rounded-full" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex pt-10 pb-4 items-center">
        <DataMyProfile loggedIn={profileUser} />
        {isLoggedIn && <div className="flex ml-auto ">{user.username === profileUser.username ? <EditProfile user={user} /> : <FollowButton id={profileUser.id} isFollowing={profileUser.isFollowingBack} />}</div>}
      </div>

      <div className="grid grid-cols-2 border-b border-gray-600 text-center font-semibold text-gray-100">
        <NavLink to={`/profile/${profileUser.username}`} className="py-3 hover:bg-slate-700 rounded-t-lg">
          All Posts
          <div className="bg-green-500 h-1 rounded-full mt-1" />
        </NavLink>
        <NavLink to={`/media/${profileUser.username}`} className="py-3 hover:bg-slate-700 rounded-t-lg">
          Media
        </NavLink>
      </div>

      <div className="pt-4">
        <TweetList tweet={tweet} />
      </div>
    </div>
  );

  return isLoggedIn ? <Layout showProfileContainer={false}>{InnerContent}</Layout> : <>{InnerContent}</>;
}

export default ProfileUsername;
