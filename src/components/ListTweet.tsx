import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { ThreadLike } from './ThreadLike';
import { NavLink, useNavigate } from 'react-router-dom';
import { TweetProps } from '@/utils/setTweets'; // <- your interface
import { formatDistanceToNowStrict } from 'date-fns';
import { Input } from './ui/input';
import { useUser } from '@/utils/useUser';
import { api } from '@/services/api';

export function TweetList({ tweet }: TweetProps) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user } = useUser();
  const [post, setPost] = useState('');
  const [selectedTweet, setSelectedTweet] = useState(0);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPost(e.target.value);
  }
  async function submitEdit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const data = new FormData();
      if (post) {
        data.append('post', post);
        console.log(data);
      }
      await api.patch(`/post/edittweet/${selectedTweet}`, data, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteTweet(id: number) {
    try {
      console.log(id);
      await api.delete(`/post/deleteTweet/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="2xl:w-full xl:w-[600px]">
      {tweet.map((t, index) => (
        <div onClick={() => navigate(`/page/${t.id}`, { state: { index } })} key={index} className="border-b-1 py-5  border-gray-500 hover:bg-gray-700 hover:cursor-pointer">
          <div className="flex pt-5">
            <Avatar className="my-auto size-12">
              <AvatarImage src={`${t.user.avatar}`} alt="@shadcn" className="object-cover" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-flex pl-3">
              <NavLink onClick={(e) => e.stopPropagation()} to={`/profile/${t.user.username.toLowerCase()}`}>
                <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{t.user.name}</h2>
              </NavLink>
              <p className="text-slate-400 pl-3">
                @{t.user.username} • <span className="hover:underline underline-offset-4">{formatDistanceToNowStrict(new Date(t.createdAt), { addSuffix: true })}</span>
              </p>
            </div>
            {user.username == t.username && (
              <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Ellipsis className="text-slate-400 hover:bg-gray-600 rounded-full hover:cursor-pointer size-7 p-1 mb-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-40 w-40 bg-gray-800 border-none shadow-xl">
                    <DropdownMenuGroup>
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600"
                            onSelect={(e) => {
                              e.preventDefault();
                              setSelectedTweet(t.id);
                            }}
                          >
                            <Pencil className="text-gray-50" />
                            <span className="text-gray-50">Edit</span>
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none">
                          <DialogHeader>
                            <DialogTitle className="text-gray-50">Edit thread</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <form onSubmit={submitEdit} className="flex flex-col items-center gap-4">
                              <Input onChange={handleChange} id="bio" name="bio" defaultValue={t.post} className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50" />
                              <Button className="ml-auto" variant={'circle'} type="submit">
                                Save changes
                              </Button>
                            </form>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem
                        className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600"
                        onSelect={(e) => {
                          e.preventDefault();
                          setSelectedTweet(t.id);
                        }}
                      >
                        <Trash2 className="text-gray-50" />
                        <button onClick={() => deleteTweet(t.id)} className="text-gray-50">
                          Delete
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          <div className="pb-2 ml-15 -mt-5">
            <p className="text-gray-300 pb-2">{t.post}</p>
            {t.image && <img src={`${t.image}`} className="2xl:max-w-fit xl:rounded-4xl pb-2 max-h-150 aspect-4/3 object-cover" alt="" />}
          </div>

          <div className="ml-15">
            <ThreadLike id={t.id} isLiked={t.isLiked} likeCount={t.likeCount} replyCount={t.replyCount} />
          </div>
        </div>
      ))}
    </div>
  );
}
