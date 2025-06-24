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
  const token = localStorage.getItem('token');
  const [tweets, setTweet] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    post: string;
    image?: File;
  }>({
    post: '',
  });
  useEffect(() => {
    setLoading(true);
    async function fetchTweet() {
      try {
        const tweets = await axios.get('http://127.0.0.1:3320/post/getTweets/');
        setTweet(tweets.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTweet();
  }, []);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files![0].size > 5 * 1024 * 1024) {
      alert('File is too large');
    }
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append('post', formData.post);
    if (formData.image) {
      data.append(`image`, formData.image);
    }
    try {
      await axios.post('http://127.0.0.1:3320/post/posttweet/', data, { headers: { Authorization: `Bearer ${token}` } });
      const tweets = await axios.get('http://127.0.0.1:3320/post/getTweets/');
      setTweet(tweets.data);
      setFormData({ post: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          <h2 className="text-2xl p-10 pb-0 text-gray-100 font-semibold">Home</h2>
          <form onSubmit={handleSubmit} action="" className="flex gap-5 p-10 border-b-1 border-gray-500 xl:max-w-[600px] 2xl:max-w-screen">
            <Avatar className="size-12">
              <AvatarImage src={`/src/uploads/${user.avatar}`} alt="@shadcn" className="object-cover" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="flex-col max-w-full">
              <Textarea
                name="post"
                className="ml-2 resize-none 2xl:w-xl border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base placeholder:text-lg placeholder:font-semibold"
                placeholder="What is happening?"
                onChange={handleChange}
                value={formData.post}
              ></Textarea>
            </div>
            <div className="flex ms-auto gap-4">
              <label htmlFor="image">
                <ImagePlus className="size-10  text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
              </label>
              <input type="file" name="image" id="image" className="hidden" onChange={handleFile} />
              <Button variant="circle">Post</Button>
            </div>
          </form>
          <TweetList tweet={tweets} />
        </div>
      )}
    </>
  );
}

export default ContentHome;
