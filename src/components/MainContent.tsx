import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';

function MainContent() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500 p-10"
      style={{
        height: '10000px',
      }}
    >
      <h2 className="text-2xl pb-7 text-gray-100 font-semibold">Home</h2>
      <form action="" className="flex ">
        <Avatar>
          <AvatarImage src="./src/assets/img/za warudo.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <textarea className="pl-2 w-xl" name="" id="" placeholder="What is happening?"></textarea>
        <Button variant="circle" className="ms-auto">
          Post
        </Button>
      </form>
    </div>
  );
}

export default MainContent;
