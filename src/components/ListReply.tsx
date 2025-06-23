import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ThreadLike } from './ThreadLike';
import { NavLink, useNavigate } from 'react-router-dom';
import { User } from '@/utils/setUser';

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
  const navigate = useNavigate();

  return (
    <>
      {replies.map((reply, index) => (
        <div key={reply.id} onClick={() => (reply.image ? navigate('/media', { state: { index } }) : navigate('/page', { state: { index } }))} className="border-b-1 p-5 px-5 border-gray-500 hover:bg-gray-700 hover:cursor-pointer">
          <div className="flex pr-5 pt-5">
            <Avatar className="my-auto size-12">
              <AvatarImage src={`${reply.user.avatar}`} alt={reply.user.username} />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-flex pl-3">
              <NavLink onClick={(e) => e.stopPropagation()} to={`/${reply.user.username.toLowerCase()}`}>
                <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{reply.user.name}</h2>
              </NavLink>
              <p className="text-slate-400 pl-3">
                @{reply.user.username} • <span className="hover:underline underline-offset-4">{new Date(reply.createdAt).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Ellipsis className="text-slate-400 hover:bg-gray-600 rounded-full hover:cursor-pointer size-7 p-1 mb-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-40 w-40 bg-gray-800 border-none shadow-xl">
                  <DropdownMenuGroup>
                    <Dialog>
                      <DialogTrigger asChild>
                        <DropdownMenuItem className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600" onSelect={(e) => e.preventDefault()}>
                          <Pencil className="text-gray-50 mr-2" />
                          <span className="text-gray-50">Edit</span>
                        </DropdownMenuItem>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none">
                        <DialogHeader>
                          <DialogTitle className="text-gray-50">Edit reply</DialogTitle>
                        </DialogHeader>
                        <form className="flex flex-col gap-4 py-4">
                          <Textarea defaultValue={reply.post} className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50" />
                          <Button className="ml-auto" variant={'circle'} type="submit">
                            Save changes
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <DropdownMenuItem className="hover:bg-gray-600 hover:cursor-pointer focus:bg-gray-600">
                      <Trash2 className="text-gray-50 mr-2" />
                      <span className="text-gray-50">Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="pb-2 ml-15 -mt-5">
            <p className="text-gray-300 pb-2">{reply.post}</p>
            {reply.image && <img src={`./src/assets/img/${reply.image}`} className="w-fit rounded-4xl pb-2 max-h-150 aspect-4/3 object-cover" alt="Reply Image" />}
          </div>

          {/* <ThreadLike likeCount={reply.likeCount} likedCount={reply.likeCount +1} /> */}
        </div>
      ))}
    </>
  );
}

export default ListReply;
