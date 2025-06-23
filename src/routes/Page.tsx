import CircleText from '@/components/CircleText';
import ContentPage from '@/layouts/components/ContentPage';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import PageMedia from './PageMedia';
import { threads } from '@/stores/threads';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useUser } from '@/utils/setUser';
import LoadingPage from '@/layouts/components/LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThreadLike } from '@/components/ThreadLike';
import { Textarea } from '@/components/ui/textarea';
import { ImagePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tweet } from '@/utils/setTweets';
import axios from 'axios';
import ListReply from '@/components/ListReply';

export interface IndexProps {
  index: number;
}

function Page() {
  const [fetchLoading, setFetchLoading] = useState(true);
  const { user, loading } = useUser();
  const { id } = useParams();
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

  if (user.id === 0) {
    return (
      <Layout minimal>
        <div className="p-5">
          <div className="flex">
            <Avatar className="my-auto">
              <AvatarImage src={tweet.user.avatar} alt="@shadcn" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-block px-5">
              <h2 className="text-gray-50 font-semibold">{tweet.user.name}</h2>
              <p className="text-slate-400">@{tweet.user.username}</p>
            </div>
          </div>
          <div className="py-3">
            <p className="text-gray-100">{tweet.post}</p>
          </div>
          <div className="pb-2">
            <p className="text-slate-400">{new Date(tweet?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="-ml-10">
            <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet?.replyCount} />
          </div>
        </div>
        <ListReply replies={tweet.reply} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="inline-flex">
          <NavLink to="/home" className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
              <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
            </div>
          </NavLink>
        </div>
        <div>
          <div className="flex p-5">
            <Avatar className="my-auto">
              <AvatarImage src={tweet.user.avatar} alt="@shadcn" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-block px-5">
              <h2 className="text-gray-50 font-semibold">{tweet.user.name}</h2>
              <p className="text-slate-400">@{tweet.user.username}</p>
            </div>
          </div>
          <div className="px-5 pb-2 ">
            <p className="text-gray-100">{tweet.post}</p>
          </div>
          <div className="flex px-5 pb-2">
            <p className="text-slate-400">{new Date(tweet?.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="-ml-10">
            <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet?.replyCount} />
          </div>
        </div>

        <form className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5 bg-gray-800">
          <Avatar className="size-10">
            <AvatarImage src={user.avatar} alt="@shadcn" className="size-10 p-0" />
            <AvatarFallback>ZW</AvatarFallback>
          </Avatar>
          <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder="Type your reply"></Textarea>
          <label htmlFor="add-image">
            <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
          </label>
          <input type="file" name="add-image" id="add-image" className="hidden" />
          <Button variant="circle" className="justify-self-end ">
            Reply
          </Button>
        </form>
        <ListReply replies={tweet.reply} />
      </div>
    </Layout>
  );
}

export default Page;
