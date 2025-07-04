import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { CircleX, ImagePlus } from 'lucide-react';
import { UserProps } from '@/utils/useUser';
import { Tweet } from '@/utils/setTweets';
import LoadingPage from './LoadingPage';
import { TweetList } from '@/components/ListTweet';
import { api } from '@/services/api';

function ContentHome({ user }: UserProps) {
  const token = localStorage.getItem('token');
  const [tweets, setTweet] = useState<Tweet[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState<{
    post: string;
    image?: File;
  }>({
    post: '',
  });
  async function fetchTweet(cursor?: number) {
    if (cursor) {
      setIsFetchingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const res = await api.get(`/post/getTweets/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          cursor,
        },
      });
      if (cursor) {
        setTweet((prev) => [...prev, ...res.data.tweets]);
      } else {
        setTweet(res.data.tweets);
      }
      setNextCursor(res.data.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  }
  useEffect(() => {
    fetchTweet();
  }, []);
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setButtonDisabled(value.trim() === '' && !formData.image);
  }
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files![0].size > 5 * 1024 * 1024) {
      alert('File is too large, maximum file size allowed is 5MB');
    }
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setButtonDisabled(false);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setButtonDisabled(true);
    setIsSubmitting(true);
    const data = new FormData();
    data.append('post', formData.post);
    if (formData.image) {
      data.append(`image`, formData.image);
    }
    if (!formData.image && formData.post == '') {
      setButtonDisabled(true);
    }
    try {
      const res = await api.post(`/post/posttweet/`, data, { headers: { Authorization: `Bearer ${token}` } });
      const newTweet = res.data;
      setTweet((prev) => [newTweet, ...prev]);
      setFormData({ post: '', image: undefined });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="px-2 py-6 w-full mx-auto ">
      <h2 className="text-2xl text-gray-100 font-semibold mb-4 ml-4">Home</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-b border-gray-600 pb-6 ">
        <div className="flex gap-4 ml-4">
          <Avatar className="size-12 shrink-0">
            <AvatarImage src={user.avatar} alt="@avatar" className="object-cover" />
            <AvatarFallback>ZW</AvatarFallback>
          </Avatar>

          <Textarea
            name="post"
            className="resize-none w-full border-none shadow-none focus:ring-green-500 text-gray-100 text-lg placeholder:text-lg placeholder:font-semibold"
            placeholder="What is happening?"
            onChange={handleChange}
            value={formData.post}
          />
        </div>

        <div className="flex justify-between items-center pl-16">
          <input type="file" name="image" id="postImage" className="hidden" onChange={handleFile} />
          {formData.image && (
            <div className="mt-3 relative w-fit">
              <CircleX
                className="absolute -top-2 -right-2 text-gray-50 bg-black hover:bg-gray-600 hover:cursor-pointer size-5 p-1 rounded-full"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, image: undefined }));
                  setButtonDisabled(true);
                }}
              />
              <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-[200px] rounded-lg" />
            </div>
          )}
        </div>
        <div className="flex ml-auto items-center gap-x-5">
          <label htmlFor="postImage">
            <ImagePlus className="size-6 text-green-500 hover:text-green-700 cursor-pointer transition duration-200" />
          </label>
          <Button variant="circle" type="submit" className="ml-auto" disabled={buttonDisabled || isSubmitting}>
            {isSubmitting ? `Posting...` : `Post`}
          </Button>
        </div>
      </form>
      {loading || tweets.length === 0 ? (
        <LoadingPage />
      ) : (
        <div className="w-full mx-auto">
          <TweetList tweet={tweets} />
          {nextCursor && (
            <div className="mt-6 text-center">
              <Button onClick={() => fetchTweet(nextCursor)} disabled={isFetchingMore} variant="ghost" className="text-white border-gray-500 hover:border-gray-300">
                {isFetchingMore ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContentHome;
