import React, { useEffect, useState } from 'react';
import ContentPage from '@/layouts/components/ContentPage';
import { CircleX, ImagePlus, PanelRight } from 'lucide-react';
import { NavLink, useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import ContentPageMedia from '@/layouts/components/ContentPageMedia';
import { threads } from '@/stores/threads';
import { User, useUser } from '@/utils/setUser';
import LoadingPage from '@/layouts/components/LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThreadLike } from '@/components/ThreadLike';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThreadReplyList from '@/components/ThreadReplyList';
import axios from 'axios';
import { Tweet } from '@/utils/setTweets';
import ListReply from '@/components/ListReply';

function PageMedia() {
  const navigate = useNavigate();
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
      followersCount: 0,
      followingCount: 0,
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
  if (loading) {
    return <LoadingPage />;
  } else if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen w-full relative">
      <div className={`bg-gray-800 border-r-1 border-gray-500 flex justify-center items-center relative transition-all duration-200 ${imageOnly ? 'flex-[1] duration-300' : 'flex-[1_1_100%] duration-1000'}`}>
        <CircleX className="absolute text-gray-50 left-10 top-10 hover:bg-gray-600 hover:cursor-pointer size-10 p-2 rounded-full" onClick={() => navigate(-1)} />
        <PanelRight onClick={() => setImageOnly((show) => !show)} className="absolute text-gray-50 right-10 top-10 hover:bg-gray-600 size-10 p-2 rounded-full hover:cursor-pointer" />
        <img src={`/src/uploads/${tweet.image}`} className="my-auto max-h-full max-w-full absolute" alt="" />
      </div>
      {imageOnly && (
        <div className="min-w-0 flex-[0.4] transition-all overflow-y-scroll duration-1000">
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
            <ListReply replies={tweet.reply} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PageMedia;
