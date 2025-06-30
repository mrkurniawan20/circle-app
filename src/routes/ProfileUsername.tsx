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
import axios from 'axios';
import LoadingPage from '@/layouts/components/LoadingPage';
import FollowButton from '@/components/FollowButton';

function ProfileUsername() {
  const token = localStorage.getItem('token');
  const { username } = useParams();
  const { user } = useUser();
  const [profileUser, setProfileUser] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
    dateOfBirth: new Date(),
    bio: '',
    avatar: 'blue.png',
    header: '',
    verified: false,
    tweetCount: 0,
    followersCount: 0,
    followingCount: 0,
    tweet: [],
    isFollowingBack: false,
  });
  const [tweet, setTweet] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        if (token) {
          const user = await axios.get(`http://localhost:3320/user/getuser/${username}`, { headers: { Authorization: `Bearer ${token}` } });
          setProfileUser(user.data);
          const tweet = await axios.get(`http://localhost:3320/post/gettweetbyusername/${user.data.username}`, { headers: { Authorization: `Bearer ${token}` } });
          setTweet(tweet.data);
          console.log(tweet.data);
        } else {
          const user = await axios.get(`http://localhost:3320/user/getuser/${username}`);
          setProfileUser(user.data);
          const tweet = await axios.get(`http://localhost:3320/post/gettweetbyusername/${user.data.username}`);
          setTweet(tweet.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Layout showProfileContainer={false}>
          <div>
            <div className="inline-flex">
              <NavLink to={'/home'} className="inline-flex items-center pt-10">
                <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
                  <ArrowLeft className="size-8 text-gray-50" />
                  <div>
                    <h2 className="text-2xl text-gray-100 font-semibold">{profileUser.name}</h2>
                    <p className="text-sm text-slate-400">{profileUser.tweetCount} tweets</p>
                  </div>
                </div>
              </NavLink>
            </div>
            <div className="p-10 pb-0 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <img src={`${profileUser.header}`} alt="" className="aspect-5/1 object-cover rounded-2xl hover:cursor-pointer" />
                </DialogTrigger>
                <DialogOverlay className="bg-black/80">
                  <DialogContent className="border-none md:min-w-full p-1 rounded-none ">
                    <img src={`${profileUser.header}`} alt="" className="aspect-5/1 object-cover" />
                  </DialogContent>
                </DialogOverlay>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <img src={`${profileUser.avatar}`} alt="" className="aspect-square object-cover size-25 rounded-full border-5 border-[#213547] ml-10 -mt-12 absolute hover:brightness-90 hover:cursor-pointer" />
                </DialogTrigger>
                <DialogOverlay className="bg-black/80">
                  <DialogContent className="border-none md:w-fit p-1 rounded-full ">
                    <img src={`${profileUser.avatar}`} alt="" className="aspect-square object-cover size-full rounded-full" />
                  </DialogContent>
                </DialogOverlay>
              </Dialog>
              <div className="flex pt-3 pb-5">{user.username == profileUser.username ? <EditProfile user={user} /> : <FollowButton id={profileUser.id} isFollowing={profileUser.isFollowingBack} />}</div>
              <DataMyProfile loggedIn={profileUser} />{' '}
            </div>
            <div className="grid grid-cols-[1fr_1fr]  pr-5 pl-5 border-b-1 border-gray-500">
              <NavLink to={`/profile/${profileUser.username}`} className="text-center text-xl text-gray-50 ">
                <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-150">All Post</p>
                <div className="bg-green-500 border-2 border-green-500 h-1 rounded-full"></div>
              </NavLink>
              <NavLink to={`/media/${profileUser.username}`} className="text-center text-xl text-gray-50">
                <p className="pt-3 pb-3  hover:bg-slate-700 duration-150 rounded-lg">Media</p>
              </NavLink>
            </div>
            <TweetList tweet={tweet} />
          </div>
        </Layout>
      )}
    </>
  );
}

export default ProfileUsername;
