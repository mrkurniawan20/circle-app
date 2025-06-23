import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
// import ThreadList from '../../components/ThreadList';
import { threads } from '@/stores/threads';
import { Ellipsis, ImagePlus, Pencil, Trash2 } from 'lucide-react';
import { loggedInUser } from '@/stores/loggedInUser';
import { User, UserProps } from '@/utils/setUser';
import axios from 'axios';
import { Tweet, TweetProps } from '@/utils/setTweets';
import { ThreadList } from '@/components/ThreadList';
import { NavLink, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ThreadLike } from '@/components/ThreadLike';
import LoadingPage from './LoadingPage';
import { formatDistanceToNow } from 'date-fns';
import { TweetList } from '@/components/ListTweet';
// import { TweetList } from '@/components/ThreadList';

function ContentHome({ user }: UserProps) {
  const navigate = useNavigate();
  const [tweets, setTweet] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTweet() {
      const tweets = await axios.get('http://127.0.0.1:3320/post/getTweets/');
      console.log(tweets.data);
      setTweet(tweets.data);
      setLoading(false);
    }
    fetchTweet();
  }, []);
  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <h2 className="text-2xl p-10 pb-0 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex gap-5 p-10 border-b-1 border-gray-500 xl:max-w-[600px] 2xl:max-w-screen">
        <Avatar className="size-12">
          <AvatarImage src={`.${user.avatar}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="flex-col max-w-full">
          <Textarea
            className="ml-2 resize-none 2xl:w-xl border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base placeholder:text-lg placeholder:font-semibold"
            placeholder="What is happening?"
          ></Textarea>
        </div>
        <div className="flex ms-auto gap-4">
          <label htmlFor="add-image">
            <ImagePlus className="size-10  text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
          </label>
          <input type="file" name="add-image" id="add-image" className="hidden" />
          <Button variant="circle">Post</Button>
        </div>
      </form>
      {/* <ThreadList threadList={threads} /> */}
      {/* {tweets!.map((t, index) => (
        <div
          onClick={() => (t.image ? navigate('/media', { state: { index: index } }) : navigate('/page', { state: { index: index } }))}
          key={index}
          className="border-b-1 p-5 pl-10 pr-10 border-gray-500 hover:bg-gray-700 hover:cursor-pointer"
        >
          <div className="flex pt-5 ">
            <Avatar className="my-auto size-12">
              <AvatarImage src={`.${t.user.avatar}`} alt="@shadcn" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-flex pl-3 ">
              <NavLink
                onClick={(e) => {
                  e.stopPropagation();
                }}
                to={`/${t.user.username.toLowerCase()}`}
              >
                <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{t.user.name}</h2>
              </NavLink>
              <p className="text-slate-400 pl-3">
                @{t.user.username} • <span className="hover:underline underline-offset-4">{formatDistanceToNow(new Date(t.createdAt))}</span>
              </p>
            </div>
            <div
              className="ml-auto"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="text-slate-400  hover:bg-gray-600 rounded-full hover:cursor-pointer size-7 p-1 mb-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-40 w-40 bg-gray-800 border-none  shadow-xl">
                  <DropdownMenuGroup>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600" onSelect={(e) => e.preventDefault()}>
                          <Pencil className="text-gray-50" />
                          <span className="text-gray-50 ">Edit</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none">
                        <DialogHeader>
                          <DialogTitle className="text-gray-50">Edit thread</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <form className="flex flex-col items-center gap-4">
                            <Textarea id="bio" name="bio" defaultValue={`${t.post}`} className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50 " />
                            <Button className="ml-auto" variant={'circle'} type="submit">
                              Save changes
                            </Button>
                          </form>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600">
                      <Trash2 className="text-gray-50" />
                      <span className="text-gray-50">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className=" pb-2 ml-15 -mt-5">
            <p className="text-gray-300 pb-2">{t.post}</p>
            {t.image && <img src={`./src/assets/img/${t.image}`} className="2xl:max-w-fit xl: rounded-4xl pb-2 max-h-150 aspect-4/3 object-cover" alt="" />}
          </div>
          <ThreadLike likeCount={t.likeCount} likedCount={t.likeCount + 1} replyCount={t.replyCount} />
        </div>
      ))} */}
      <TweetList tweet={tweets} />
    </div>
  );
}

export default ContentHome;
