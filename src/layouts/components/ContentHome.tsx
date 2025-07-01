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
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [formData, setFormData] = useState<{
    post: string;
    image?: File;
  }>({
    post: '',
  });
  async function fetchTweet() {
    setLoading(true);
    try {
      const tweets = await api.get(`/post/getTweets/`, { headers: { Authorization: `Bearer ${token}` } });
      setTweet(tweets.data);
      console.log(tweets.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      alert('File is too large');
    }
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setButtonDisabled(false);
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
    if (!formData.image && formData.post == '') {
      setButtonDisabled(true);
    }
    try {
      await api.post(`/post/posttweet/`, data, { headers: { Authorization: `Bearer ${token}` } });
      const tweets = await api.get(`/post/getTweets/`, { headers: { Authorization: `Bearer ${token}` } });
      console.log(tweets.data);
      setTweet(tweets.data);
      setFormData({ post: '' });
      await fetchTweet();
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
        <div className="px-2 py-6 max-w-2xl mx-auto">
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
              <Button variant="circle" type="submit" className="ml-auto" disabled={buttonDisabled}>
                Post
              </Button>
            </div>
          </form>
          <div className="w-full mx-auto">
            <TweetList tweet={tweets} />
          </div>
        </div>
      )}
    </>
  );
}

export default ContentHome;
