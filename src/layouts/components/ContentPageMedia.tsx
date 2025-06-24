import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { replies } from '@/stores/replies';
import { ThreadList } from '../../components/ThreadList';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { ImagePlus, MessageSquareText } from 'lucide-react';
import { ThreadLike } from '@/components/ThreadLike';
import { threads } from '@/stores/threads';
import { loggedInUser } from '@/stores/loggedInUser';
import ThreadReplyList from '@/components/ThreadReplyList';
import { UserProps, useUser } from '@/utils/setUser';
import { Tweet } from '@/utils/setTweets';
import axios from 'axios';
import { Input } from '@/components/ui/input';

function ContentPageMedia() {
  const token = localStorage.getItem('token');
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
  return (
    <div>
      <div className="flex p-5">
        <Avatar className="my-auto">
          <AvatarImage src={`./src/uploads/${tweet.user.avatar}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-block pl-5">
          <h2 className="text-gray-50">{tweet.user.name}</h2>
          <p className="text-slate-400">@{tweet.user.username}</p>
        </div>
      </div>
      <div className="pl-5 pb-2 ">
        <p className="text-gray-100">{tweet.post}</p>
      </div>
      <div className="flex pl-5 pb-2">
        <p className="text-slate-400">{new Date(tweet.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="-ml-10">
        <ThreadLike likeCount={tweet.likeCount} likedCount={tweet.likeCount + 1} replyCount={tweet.replyCount} />
      </div>

      <form action="" className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5 bg-gray-800">
        <Avatar className="">
          <AvatarImage src={`/src/uploads/${user!.avatar}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Input className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder="Type your reply"></Input>
        <label htmlFor="add-image">
          <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
        </label>
        <input type="file" name="add-image" id="add-image" className="hidden" />
        <Button variant="circle" className="justify-self-end ">
          Reply
        </Button>
      </form>
      <ThreadReplyList threadList={replies} />
    </div>
  );
}

export default ContentPageMedia;
