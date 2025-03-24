import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className="border-t-1 border-b-1 p-5 pl-10 pr-10 border-gray-500">
      <div className="flex pr-5 pt-5 ">
        <Avatar className="my-auto">
          <AvatarImage src={`./src/assets/img/${avatarImage}.png`} alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-flex pl-5 items-center">
          <h2 className="text-gray-50 font-semibold">{name}</h2>
          <p className="text-slate-400 pl-3">
            @{username} • {relativeTime}
          </p>
        </div>
      </div>
      <div className=" pb-2 ml-15">
        <p className="text-gray-100 pb-2">{thread}</p>
        <img src={`./src/assets/img/${threadImage}.png`} className="w-fit rounded-4xl pb-2" alt="" />
      </div>
      <div className="flex items-center gap-2 ml-15 pb-5">
        <img src={`./src/assets/img/${liked === 'liked' ? 'liked' : 'unlike'}.png`} alt="" width="2.5%" />
        <p className="text-slate-400">{likeCount}</p>
        <img src="./src/assets/img/text-bubble.png" className="invert" alt="" width="2.5%" />
        <p className="text-slate-400">{replyCount} Replies</p>
      </div>
    </div>
  );
}

export default ThreadList;
