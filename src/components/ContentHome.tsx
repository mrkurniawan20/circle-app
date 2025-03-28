import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import ThreadList from './ThreadList';
import { threads } from '@/stores/threads';
import { ImagePlus } from 'lucide-react';

function ContentHome() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500 border-collapse"
      // style={{
      //   height: '10000px',
      // }}
    >
      <h2 className="text-2xl p-10 pb-0 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex gap-5 p-10 border-b-1 border-gray-500">
        <Avatar className="size-12">
          <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea
          className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base placeholder:text-lg placeholder:font-semibold"
          placeholder="What is happening?"
        ></Textarea>
        <label htmlFor="add-image">
          <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 transform-all duration-200" />
        </label>
        <input type="file" name="add-image" id="add-image" className="hidden" />
        <Button variant="circle" className="justify-self-end ">
          Post
        </Button>
      </form>
      {threads.map((thread, index) => (
        <ThreadList
          key={index}
          avatarImage={thread.avatarImage}
          name={thread.name}
          username={thread.username}
          relativeTime={thread.relativeTime}
          threadImage={thread.threadImage}
          thread={thread.thread}
          likedCount={thread.likedCount}
          likeCount={thread.likeCount}
          replyCount={thread.replyCount}
        />
      ))}
    </div>
  );
}

export default ContentHome;
