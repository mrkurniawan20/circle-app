import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import ThreadList from './ThreadList';

const threads = [
  {
    avatarImage: 'rainbow',
    name: 'Blackmore',
    username: 'CatchTheRainbow',
    relativeTime: '4h',
    threadImage: '',
    thread: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quos facere, rem ut cupiditate fugiat nihil velit! Quam nesciunt, quae facilis voluptatum sed culpa itaque ut totam reiciendis laboriosam natus!', //Thread
    liked: 'liked' as 'liked' | 'unlike',
    likeCount: '30',
    replyCount: '100',
  },
  {
    avatarImage: 'golden requim',
    name: 'Giorno',
    username: 'GoldenRequim',
    relativeTime: '1d',
    threadImage: 'header-resized.png',
    thread: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam hic expedita deleniti ipsam exercitationem iure enim molestiae repudiandae odio maxime?', //Thread
    liked: 'unlike' as 'unlike' | 'liked',
    likeCount: '30',
    replyCount: '100',
  },
  {
    avatarImage: 'diver down',
    name: 'Anasui',
    username: 'DiverDown',
    relativeTime: '12d',
    threadImage: 'dio.jpg',
    thread: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque quos facere, rem ut cupiditate fugiat nihil velit! Quam nesciunt, quae facilis voluptatum sed culpa itaque ut totam reiciendis laboriosam natus!', //Thread
    liked: 'liked' as 'liked' | 'unlike',
    likeCount: '30',
    replyCount: '100',
  },
];

function ContentHome() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500"
      style={{
        height: '10000px',
      }}
    >
      <h2 className="text-2xl p-10 pb-0 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex gap-5 p-10">
        <Avatar className="">
          <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base" placeholder="What is happening?"></Textarea>
        <img className="justify-self-end size-10" src="./src/assets/img/add-image-green.png" alt="" />
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
          liked={thread.liked}
          likeCount={thread.likeCount}
          replyCount={thread.replyCount}
        />
      ))}
    </div>
  );
}

export default ContentHome;
