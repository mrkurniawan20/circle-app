import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function MainContent() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500 p-10"
      style={{
        height: '10000px',
      }}
    >
      <h2 className="text-2xl text-gray-300 font-semibold">Home</h2>
      <form action="" className="flex">
        <Avatar>
          <AvatarImage src="./src/assets/img/za warudo.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <input type="text" placeholder="What is happening?" />
      </form>
    </div>
  );
}

export default MainContent;
