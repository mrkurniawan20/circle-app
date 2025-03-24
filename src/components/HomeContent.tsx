import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

function HomeContent() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500 p-10"
      style={{
        height: '10000px',
      }}
    >
      <h2 className="text-2xl pb-7 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex gap-5">
        <Avatar className="">
          <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-base" placeholder="What is happening?"></Textarea>
        <img className="justify-self-end invert-50  size-10" src="./src/assets/img/add-image.png" alt="" />
        <Button variant="circle" className="justify-self-end ">
          Post
        </Button>
      </form>
    </div>
  );
}

export default HomeContent;
