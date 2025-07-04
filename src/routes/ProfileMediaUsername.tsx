import DataMyProfile from '@/components/DataMyProfile';
import EditProfile from '@/components/EditProfile';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
import { User, useUser } from '@/utils/useUser';
import { Tweet } from '@/utils/setTweets';
import LoadingPage from '@/layouts/components/LoadingPage';
import FollowButton from '@/components/FollowButton';
import { api } from '@/services/api';

function ProfileMediaUsername() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, loading } = useUser();
  const { username } = useParams();

  const [tweet, setTweets] = useState<Tweet[]>([]);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  async function fetchData() {
    try {
      const userRes = await api.get(`/user/getuser/${username}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const tweetRes = await api.get(token ? `/post/getTweetWithImage/${userRes.data.username}` : `/post/gettweetbyusername/${userRes.data.username}`);

      setProfileUser(userRes.data);
      setTweets(tweetRes.data.filter((t: Tweet) => t.image));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [username, token]);

  if (loading || profileUser == null) return <LoadingPage />;
  const isLoggedIn = user.id !== 0;

  const InnerContent = (
    <div className="w-full  mx-auto px-4 sm:px-6 min-h-screen">
      {isLoggedIn && (
        <NavLink to="/home" className="flex items-center gap-3 mt-4 py-2 hover:bg-slate-700 rounded-full px-4 w-fit">
          <ArrowLeft className="size-6 text-gray-50" />
          {isMobile && null}
          <h2 className="text-xl font-semibold text-gray-100">{profileUser.name}</h2>
        </NavLink>
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
        {isLoggedIn && <div className="flex ml-auto ">{user.username === profileUser.username ? <EditProfile user={user} /> : <FollowButton id={profileUser.id} isFollowing={profileUser.isFollowingBack} onFollow={fetchData} />}</div>}
      </div>

      <div className="grid grid-cols-2 border-b border-gray-600 text-center font-semibold text-gray-100">
        <NavLink to={`/profile/${profileUser.username}`} className="py-3 hover:bg-slate-700 rounded-t-lg">
          All Posts
        </NavLink>
        <NavLink to={`/media/${profileUser.username}`} className="py-3 hover:bg-slate-700 rounded-t-lg">
          Media
          <div className="bg-green-500 h-1 rounded-full mt-1" />
        </NavLink>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-4">
        {tweet.map((img, index) => (
          <div key={index} onClick={() => navigate(`/page/${img.id}`, { state: { index } })} className="cursor-pointer">
            <img src={img.image} alt="" className="aspect-square object-cover rounded-lg hover:brightness-75 transition duration-150" />
          </div>
        ))}
      </div>
    </div>
  );

  // return isLoggedIn ? <Layout showProfileContainer={false}>{InnerContent}</Layout> : <>{InnerContent}</>;
  return <>{InnerContent}</>;
}

export default ProfileMediaUsername;
