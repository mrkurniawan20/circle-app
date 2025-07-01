import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { NavLink, useNavigate } from 'react-router-dom';
import { User, useUser } from '@/utils/useUser';
import { useState } from 'react';
import { Input } from './ui/input';
import { formatDistanceToNowStrict } from 'date-fns';
import { api } from '@/services/api';
import LoadingPage from '@/layouts/components/LoadingPage';

export interface Reply {
  id: number;
  post: string;
  image?: string;
  likeCount: number;
  tweetId: number;
  userId: number;
  createdAt: Date;
  user: User;
}

interface ReplyListProps {
  replies: Reply[];
}

function ListReply({ replies }: ReplyListProps) {
  function formatCompactTime(date: Date | string) {
    const [num, unit] = formatDistanceToNowStrict(new Date(date)).split(' ');

    return num + (unit[0] === 'm' ? 'm' : unit[0]); // special case for "minutes"
  }
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
      }
      await api.patch(`/post/editReply/${selectedTweet}`, data, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteReply(id: number) {
    try {
      console.log(id);
      await api.delete(`/post/deleteReply/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    }
  }
  if (user == null) return <LoadingPage />;
  return (
    <>
      {replies.map((reply, index) => (
        <div key={reply.id} onClick={() => (reply.image ? navigate('/media', { state: { index } }) : navigate('/page', { state: { index } }))} className="border-b-1 py-1  border-gray-500 hover:bg-gray-700 hover:cursor-pointer">
          <div className="flex pr-5 pt-5">
            <Avatar className="my-auto size-12">
              <AvatarImage src={`${reply.user.avatar}`} alt={reply.user.username} className="object-cover" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-flex pl-3">
              <NavLink onClick={(e) => e.stopPropagation()} to={`/${reply.user.username.toLowerCase()}`}>
                <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{reply.user.name}</h2>
              </NavLink>
              <p className="text-slate-400 pl-3">
                @{reply.user.username} • <span className="hover:underline underline-offset-4">{formatCompactTime(new Date(reply.createdAt))}</span>
              </p>
            </div>
            {user.id == reply.userId && (
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
                              setSelectedTweet(reply.id);
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
                              <Input
                                onChange={handleChange}
                                id="bio"
                                name="bio"
                                defaultValue={reply.post}
                                className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50"
                              />
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
                          setSelectedTweet(reply.id);
                        }}
                      >
                        <Trash2 className="text-gray-50" />
                        <button
                          onClick={() => {
                            deleteReply(reply.id);
                          }}
                          className="text-gray-50"
                        >
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
            <p className="text-gray-300 pb-2">{reply.post}</p>
            {reply.image && <img src={`${reply.image}`} className="w-fit rounded-4xl pb-2 max-h-150 aspect-4/3 object-cover" alt="Reply Image" />}
          </div>

          {/* <ThreadLike likeCount={reply.likeCount} likedCount={reply.likeCount +1} /> */}
        </div>
      ))}
    </>
  );
}

export default ListReply;
