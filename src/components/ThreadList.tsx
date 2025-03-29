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

interface Threads {
  //Threads
  avatarImage: string;
  name: string;
  username: string;
  relativeTime: string;
  threadImage?: string;
  thread: string; //Thread
  // liked: 'liked' | 'unlike';
  likeCount: string;
  likedCount: string;
  replyCount: string;
}

function ThreadList({ avatarImage, name, username, relativeTime, threadImage, thread, likeCount, likedCount, replyCount }: Threads) {
  const [like, setLike] = useState<boolean>(false);

  const toggleLike = () => {
    setLike(!like);
  };
  return (
    <div className="border-b-1 p-5 pl-10 pr-10 border-gray-500 hover:bg-gray-700 hover:cursor-pointer">
      <div className="flex pr-5 pt-5 ">
        <Avatar className="my-auto size-12">
          <AvatarImage src={`./src/assets/img/${avatarImage}.png`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-flex pl-3 ">
          <h2 className="text-gray-50 font-semibold hover:underline underline-offset-4">{name}</h2>
          <p className="text-slate-400 pl-3">
            @{username} • <span className="hover:underline underline-offset-4">{relativeTime}</span>
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
                    <DropdownMenuItem className="hover:bg-gray-600 focus:bg-gray-600" onSelect={(e) => e.preventDefault()}>
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
                        <Textarea id="bio" name="bio" defaultValue={`${thread}`} className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50 " />
                        <Button className="ml-auto" variant={'circle'} type="submit">
                          Save changes
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                <DropdownMenuItem className="hover:bg-gray-600 focus:bg-gray-600">
                  <Trash2 className="text-gray-50" />
                  <span className="text-gray-50">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className=" pb-2 ml-15 -mt-5">
        <p className="text-gray-300 pb-2">{thread}</p>
        <img src={`./src/assets/img/${threadImage}`} className="w-fit rounded-4xl pb-2" alt="" />
      </div>
      <div className="flex items-center gap-4 ml-15 pb-5">
        <button onClick={toggleLike} className="text-lg flex items-center gap-2 text-slate-400 hover:text-gray-50 hover:cursor-pointer transition-all duration-200">
          {like ? (
            <>
              <GoHeartFill className="text-red-700 size-6" />
              <span className="text-gray-50">{likedCount}</span>
            </>
          ) : (
            <>
              <GoHeart className=" size-6" />
              <span>{likeCount}</span>
            </>
          )}
        </button>
        <div className="flex gap-2">
          <MessageSquareText className="text-slate-400 size-6" />
          <p className="text-slate-400">{replyCount} Replies</p>
        </div>
      </div>
    </div>
  );
}

export default ThreadList;
