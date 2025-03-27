import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Ellipsis, Pencil, Trash2 } from 'lucide-react';
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

interface Threads {
  //Threads
  avatarImage: string;
  name: string;
  username: string;
  relativeTime: string;
  threadImage?: string;
  thread: string; //Thread
  liked: 'liked' | 'unlike';
  likeCount: string;
  replyCount: string;
}

function ThreadList({ avatarImage, name, username, relativeTime, threadImage, thread, liked, likeCount, replyCount }: Threads) {
  return (
    <div className="border-b-1 p-5 pl-10 pr-10 border-gray-500">
      <div className="flex pr-5 pt-5 ">
        <Avatar className="my-auto size-12">
          <AvatarImage src={`./src/assets/img/${avatarImage}.png`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-flex pl-3 ">
          <h2 className="text-gray-50 font-semibold">{name}</h2>
          <p className="text-slate-400 pl-3">
            @{username} • {relativeTime}
          </p>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Ellipsis className="text-slate-400  hover:bg-gray-600 rounded-full" />
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
      <div className="flex items-center gap-2 ml-15 pb-5">
        <img src={`./src/assets/img/${liked === 'liked' ? 'liked' : 'unlike'}.png`} className={liked === 'unlike' ? `invert` : `invert-0`} alt="" width="2.5%" />
        <p className="text-slate-400">{likeCount}</p>
        <img src="./src/assets/img/text-bubble.png" className="invert" alt="" width="2.5%" />
        <p className="text-slate-400">{replyCount} Replies</p>
      </div>
    </div>
  );
}

export default ThreadList;
