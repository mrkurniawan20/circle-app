import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, MessageSquareText, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import ThreadLike from './ThreadLike';
import { ThreadProps } from '@/types/threadList';
import { useNavigate } from 'react-router-dom';

// interface Threads {
//   //Threads
//   avatarImage: string;
//   name: string;
//   username: string;
//   relativeTime: string;
//   threadImage?: string;
//   thread: string; //Thread
//   // liked: 'liked' | 'unlike';
//   likeCount: string;
//   likedCount: string;
//   replyCount: string;
// }
// interface ThreadProps {
//   threadList: Threads[];
// }

function ThreadList({ threadList = [] }: ThreadProps) {
  const navigate = useNavigate();
  return (
    <>
      {threadList.map((threads, index) => (
        <div
          onClick={() => (threads.threadImage ? navigate('/media', { state: { index: index } }) : navigate('/page', { state: { index: index } }))}
          key={index}
          className="border-b-1 p-5 pl-10 pr-10 border-gray-500 hover:bg-gray-700 hover:cursor-pointer"
        >
          <div className="flex pr-5 pt-5 ">
            <Avatar className="my-auto size-12">
              <AvatarImage src={`./src/assets/img/${threads.avatarImage}.png`} alt="@shadcn" />
              <AvatarFallback>ZW</AvatarFallback>
            </Avatar>
            <div className="inline-flex pl-3 ">
              <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{threads.name}</h2>
              <p className="text-slate-400 pl-3">
                {threads.username} • <span className="hover:underline underline-offset-4">{threads.relativeTime}</span>
              </p>
            </div>
            <div className="ml-auto">
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
                            <Textarea id="bio" name="bio" defaultValue={`${threads.thread}`} className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50 " />
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
            <p className="text-gray-300 pb-2">{threads.thread}</p>
            <img src={`./src/assets/img/${threads.threadImage}`} className="w-fit rounded-4xl pb-2" alt="" />
          </div>
          <ThreadLike likeCount={threads.likeCount} likedCount={threads.likedCount} replyCount={threads.replyCount} />
        </div>
      ))}
    </>
  );
}

export default ThreadList;
