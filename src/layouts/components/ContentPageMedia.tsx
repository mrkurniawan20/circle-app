import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';
import { NavLink, useLocation } from 'react-router-dom';
import { replies } from '@/stores/replies';
import { ThreadList } from '../../components/ThreadList';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { ImagePlus, MessageSquareText } from 'lucide-react';
import { ThreadLike } from '@/components/ThreadLike';
import { threads } from '@/stores/threads';
import { loggedInUser } from '@/stores/loggedInUser';
import ThreadReplyList from '@/components/ThreadReplyList';
import { UserProps, useUser } from '@/utils/setUser';

function ContentPageMedia({ user }: UserProps) {
  const location = useLocation();
  const index = location.state?.index ?? 0;
  return (
    <div>
      <div className="flex p-5">
        <Avatar className="my-auto">
          <AvatarImage src={`./src/assets/img/${threads[index].avatarImage}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-block pl-5">
          <h2 className="text-gray-50">{threads[index].name}</h2>
          <p className="text-slate-400">@{threads[index].username}</p>
        </div>
      </div>
      <div className="pl-5 pb-2 ">
        <p className="text-gray-100">{threads[index].thread}</p>
      </div>
      <div className="flex pl-5 pb-2">
        <p className="text-slate-400">{threads[index].datePosted}</p>
      </div>
      <div className="-ml-10">
        <ThreadLike likeCount={threads[index].likeCount} likedCount={threads[index].likedCount} replyCount={replies.length} />
      </div>

      <form action="" className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5 bg-gray-800">
        <Avatar className="">
          <AvatarImage src={`.${user!.avatar}`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder="Type your reply"></Textarea>
        <label htmlFor="add-image">
          <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
        </label>
        <input type="file" name="add-image" id="add-image" className="hidden" />
        <Button variant="circle" className="justify-self-end ">
          Reply
        </Button>
      </form>
      <ThreadReplyList threadList={replies} />
    </div>
  );
}

export default ContentPageMedia;
