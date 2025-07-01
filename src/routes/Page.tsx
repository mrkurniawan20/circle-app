import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useUser } from '@/utils/useUser';
import LoadingPage from '@/layouts/components/LoadingPage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThreadLike } from '@/components/ThreadLike';
import { ArrowLeft, CircleX, ImagePlus, Loader2, PanelRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tweet } from '@/utils/setTweets';
import ListReply from '@/components/ListReply';
import { Input } from '@/components/ui/input';
import { api } from '@/services/api';
import Layout from '@/layouts/Layout';

function Page() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, loading } = useUser();
  const { id } = useParams();
  const [imageOnly, setImageOnly] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

  const [tweet, setTweet] = useState<Tweet | null>(null);

  const [formData, setFormData] = useState<{ reply?: string; image?: File }>({ reply: '' });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    async function fetchData() {
      try {
        setFetchLoading(true);
        const res = await api.get(`/post/gettweet/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setTweet(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setFetchLoading(false);
      }
    }
    fetchData();
  }, [id, token]);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    if (files[0].size > 5 * 1024 * 1024) {
      alert(`File is too large`);
      return;
    }
    setFormData((prev) => ({ ...prev, image: files[0] }));
  }

  async function submitReply(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsReplying(true);
      const data = new FormData();
      if (formData.reply) data.append('reply', formData.reply);
      if (formData.image) data.append('image', formData.image);
      setFetchLoading(true);
      await api.post(`/post/replytweet/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const res = await api.get(`/post/gettweet/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTweet(res.data);
      setFormData({ reply: '', image: undefined });
    } catch (error) {
      console.error(error);
    } finally {
      setFetchLoading(false);
      setIsReplying(false);
    }
  }

  if (loading || tweet == null) return <LoadingPage />;
  const isLoggedIn = user.id !== 0;
  const hasImage = !!tweet.image;

  const TweetHeader = () => (
    <div className="flex py-5 px-3">
      <Avatar className="my-auto">
        <AvatarImage src={tweet.user.avatar} className="object-cover" />
        <AvatarFallback>ZW</AvatarFallback>
      </Avatar>
      <div className="inline-block px-5">
        <h2 className="text-gray-50">{tweet.user.name}</h2>
        <p className="text-slate-400">@{tweet.user.username}</p>
      </div>
    </div>
  );

  const TweetBody = () => (
    <>
      <p className="text-gray-100 pb-2 px-3">{tweet.post}</p>
      {hasImage && <img src={tweet.image} alt="Tweet visual" className="rounded-lg my-4" />}
      <p className="text-slate-400 px-3">{new Date(tweet.createdAt).toLocaleDateString()}</p>
      <div className="p-3 border-b-1 border-gray-500">
        <ThreadLike id={tweet.id} isLiked={tweet.isLiked} likeCount={tweet.likeCount} replyCount={tweet.replyCount} />
      </div>
    </>
  );

  const ReplyBox = isLoggedIn && (
    <form onSubmit={submitReply} className="flex items-start border-t border-b border-gray-500 px-5 py-4 bg-gray-800 w-full gap-3">
      <Avatar className="size-10 mt-1">
        <AvatarImage src={user.avatar} className="object-cover" />
        <AvatarFallback>ZW</AvatarFallback>
      </Avatar>
      <div className="flex flex-col w-full">
        <input onChange={handleFile} value={''} type="file" name="replyImage" id="replyImage" className="hidden" />
        <Input onChange={handleChange} value={formData.reply} name="reply" className="w-full border-none shadow-none focus:ring-green-500 text-gray-100 text-sm sm:text-base" placeholder="Type your reply..." />
        {formData.image && (
          <div className="mt-3 relative w-fit">
            <CircleX
              className="absolute -top-2 -right-2 text-gray-50 bg-black hover:bg-gray-600 hover:cursor-pointer size-5 p-1 rounded-full"
              onClick={() => {
                setFormData((prev) => ({ ...prev, image: undefined }));
                const fileInput = document.getElementById('replyImage') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
              }}
            />
            <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-[200px] rounded-lg" />
          </div>
        )}
        <div className="mt-4 flex justify-between items-center w-full">
          <label htmlFor="replyImage">
            <ImagePlus className="size-6 sm:size-7 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
          </label>
          <Button type="submit" variant="circle">
            {isReplying ? <Loader2 className="h-10 w-10 animate-spin text-gray-500" /> : `Reply`}
          </Button>
        </div>
      </div>
    </form>
  );

  if (isMobile) {
    return (
      <div className="p-2">
        <div className="inline-flex">
          <NavLink to="/home" className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
              <ArrowLeft className="text-gray-100" />
              <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
            </div>
          </NavLink>
        </div>
        <TweetHeader />
        <TweetBody />
        {ReplyBox}
        {fetchLoading ? <LoadingPage /> : <ListReply replies={tweet.reply} />}
      </div>
    );
  }

  // DESKTOP
  if (hasImage) {
    return (
      <div className="flex h-screen w-full relative">
        <div className={`bg-gray-800 border-r border-gray-700 flex justify-center items-center relative transition-all duration-200 ${imageOnly ? 'flex-[1] duration-300' : 'flex-[1_1_100%] duration-1000'}`}>
          <CircleX className="absolute text-gray-50 left-6 top-6 hover:bg-gray-600 hover:cursor-pointer size-10 p-2 rounded-full" onClick={() => navigate(-1)} />
          <PanelRight onClick={() => setImageOnly((show) => !show)} className="absolute text-gray-50 right-6 top-6 hover:bg-gray-600 size-10 p-2 rounded-full hover:cursor-pointer" />
          <img src={tweet.image} className="my-auto max-h-full max-w-full absolute" alt="tweet" />
        </div>
        {imageOnly && (
          <div className="min-w-0 w-full max-w-xl overflow-y-auto bg-[#213547] border-l border-gray-700 flex flex-col">
            <div className="p-5 flex-1 w-full">
              <TweetHeader />
              <div className="py-3">
                <p className="text-gray-100 break-words">{tweet.post}</p>
                <img src={tweet.image} alt="tweet-mobile" className="md:hidden mt-3 rounded-lg" />
              </div>
              <p className="text-slate-400">{new Date(tweet.createdAt).toLocaleDateString()}</p>
              <ThreadLike id={tweet.id} isLiked={tweet.isLiked} likeCount={tweet.likeCount} replyCount={tweet.replyCount} />
              {ReplyBox}
            </div>
            {fetchLoading ? <LoadingPage /> : <ListReply replies={tweet.reply} />}
          </div>
        )}
      </div>
    );
  }

  if (isLoggedIn) {
    return (
      <Layout>
        <div className="p-2">
          <div className="inline-flex">
            <NavLink to="/home" className="inline-flex items-center pt-10">
              <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
                <ArrowLeft className="text-gray-100" />
                <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
              </div>
            </NavLink>
          </div>
          <TweetHeader />
          <TweetBody />
          {ReplyBox}
          {fetchLoading ? <LoadingPage /> : <ListReply replies={tweet.reply} />}
        </div>
      </Layout>
    );
  }
  return (
    <Layout minimal={true}>
      <div className="p-2">
        <div className="inline-flex">
          <NavLink to="/home" className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700 duration-200">
              <ArrowLeft className="text-gray-100" />
              <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
            </div>
          </NavLink>
        </div>
        <TweetHeader />
        <TweetBody />
        {ReplyBox}
        {fetchLoading ? <LoadingPage /> : <ListReply replies={tweet.reply} />}
      </div>
    </Layout>
  );
}

export default Page;
