import CircleText from '@/components/CircleText';
import ContentPage from '@/layouts/components/ContentPage';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import PageMedia from './PageMedia';
import { threads } from '@/stores/threads';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@/utils/setUser';
import LoadingPage from '@/layouts/components/LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThreadLike } from '@/components/ThreadLike';
import { Textarea } from '@/components/ui/textarea';
import { CircleX, ImagePlus, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tweet } from '@/utils/setTweets';
import axios from 'axios';
import ListReply from '@/components/ListReply';

export interface IndexProps {
  index: number;
}

function Page() {
  const navigate = useNavigate();
  const [fetchLoading, setFetchLoading] = useState(true);
  const { user, loading } = useUser();
  const { id } = useParams();
  const [imageOnly, setImageOnly] = useState(true);
  const [tweet, setTweet] = useState<Tweet>({
    id: 0,
    post: '',
    image: '',
    userId: 0,
    likeCount: 0,
    replyCount: 0,
    createdAt: new Date(),
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
      dateOfBirth: new Date(),
      bio: '',
      avatar: '',
      header: '',
      verified: false,
      tweetCount: 0,
      followers: 0,
      following: 0,
      tweet: [],
    },
    reply: [],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setFetchLoading(true);
        const res = await axios.get(`http://localhost:3320/post/gettweet/${id}`);
        setTweet(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading || fetchLoading) return <LoadingPage />;

  if (tweet.image) {
    return (
      <div className="flex h-screen w-full relative">
        <div className={`bg-gray-800 border-r-1 border-gray-500 flex justify-center items-center relative transition-all duration-200 ${imageOnly ? 'flex-[1] duration-300' : 'flex-[1_1_100%] duration-1000'}`}>
          <CircleX className="absolute text-gray-50 left-10 top-10 hover:bg-gray-600 hover:cursor-pointer size-10 p-2 rounded-full" onClick={() => navigate(-1)} />
          <PanelRight onClick={() => setImageOnly((show) => !show)} className="absolute text-gray-50 right-10 top-10 hover:bg-gray-600 size-10 p-2 rounded-full hover:cursor-pointer" />
          <img
            src={`${tweet.image}`} // assumes your image is in public/img/
            className="my-auto max-h-full max-w-full absolute"
            alt=""
          />
        </div>

        {imageOnly && (
          <div className="min-w-0 flex-[0.4] overflow-y-scroll bg-[#213547] border-l border-gray-700">
            <div className="p-5">
              <div className="flex">
                <Avatar className="my-auto">
                  <AvatarImage src={tweet.user.avatar} />
                  <AvatarFallback>ZW</AvatarFallback>
                </Avatar>
                <div className="inline-block px-5">
                  <h2 className="text-gray-50">{tweet.user.name}</h2>
                  <p className="text-slate-400">@{tweet.user.username}</p>
                </div>
              </div>

              <div className="py-3">
                <p className="text-gray-100">{tweet.post}</p>
              </div>

              <p className="text-slate-400">{new Date(tweet.createdAt).toLocaleDateString()}</p>
              <div className="-ml-10 mt-3">
                <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet.replyCount} />
              </div>

              <form className="flex gap-5 border-t border-b border-gray-500 p-5 bg-gray-800 mt-5">
                <Avatar className="size-10">
                  <AvatarImage src={user.avatar} alt="@shadcn" />
                  <AvatarFallback>ZW</AvatarFallback>
                </Avatar>
                <Textarea className="ml-2 resize-none w-xl max-w-xl border-none shadow-none focus:ring-green-500 text-gray-100 text-xl font-semibold" placeholder="Type your reply" />
                <label htmlFor="add-image">
                  <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
                </label>
                <input type="file" name="add-image" id="add-image" className="hidden" />
                <Button variant="circle" className="justify-self-end">
                  Reply
                </Button>
              </form>

              <ListReply replies={tweet.reply} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // === DEFAULT LAYOUT (no image)
  if (user.id === 0) {
    return (
      <Layout minimal>
        <div className="p-5">
          <div className="flex">
            <Avatar className="my-auto">
              <AvatarImage src={tweet.user.avatar} />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-block px-5">
              <h2 className="text-gray-50">{tweet.user.name}</h2>
              <p className="text-slate-400">@{tweet.user.username}</p>
            </div>
          </div>
          <div className="py-3">
            <p className="text-gray-100">{tweet.post}</p>
          </div>
          <p className="text-slate-400">{new Date(tweet.createdAt).toLocaleDateString()}</p>
          <div className="-ml-10 mt-3">
            <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet.replyCount} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-5">
        <div className="inline-flex">
          <NavLink to="/home" className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
              <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
            </div>
          </NavLink>
        </div>

        <div className="flex py-5">
          <Avatar className="my-auto">
            <AvatarImage src={tweet.user.avatar} />
            <AvatarFallback>ZW</AvatarFallback>
          </Avatar>
          <div className="inline-block px-5">
            <h2 className="text-gray-50">{tweet.user.name}</h2>
            <p className="text-slate-400">@{tweet.user.username}</p>
          </div>
        </div>

        <p className="text-gray-100 pb-2">{tweet.post}</p>
        <p className="text-slate-400">{new Date(tweet.createdAt).toLocaleDateString()}</p>

        <div className="-ml-10 mt-3">
          <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet.replyCount} />
        </div>

        <form className="flex gap-5 border-t border-b border-gray-500 p-5 bg-gray-800 mt-5">
          <Avatar className="size-10">
            <AvatarImage src={user.avatar} alt="@shadcn" className="size-10 p-0" />
            <AvatarFallback>ZW</AvatarFallback>
          </Avatar>
          <Textarea className="ml-2 resize-none w-xl max-w-xl border-none shadow-none focus:ring-green-500 text-gray-100 text-xl font-semibold" placeholder="Type your reply" />
          <label htmlFor="add-image">
            <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
          </label>
          <input type="file" name="add-image" id="add-image" className="hidden" />
          <Button variant="circle" className="justify-self-end">
            Reply
          </Button>
        </form>

        <ListReply replies={tweet.reply} />
      </div>
    </Layout>
  );
}

export default Page;
