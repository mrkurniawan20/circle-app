import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { NavLink } from 'react-router-dom';

function PageContent() {
  return (
    <div
      className="main-content border-l-1 border-r-1 border-gray-500 border-collapse"
      // style={{
      //   height: '10000px',
      // }}
    >
      <div className="inline-flex">
        <NavLink to={'/home'} className="inline-flex items-center pt-10">
          <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
            <img src="./src/assets/img/back.png" className="invert w-6 h-6" alt="" />
            <h2 className="text-2xl text-gray-100 font-semibold">Home</h2>
          </div>
        </NavLink>
      </div>

      <div className="flex p-5">
        <Avatar className="my-auto">
          <AvatarImage src="./src/assets/img/rainbow.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <div className="inline-block pl-5">
          <h2 className="text-gray-50">Blackmore</h2>
          <p className="text-slate-400">@CatchTheRainbow</p>
        </div>
      </div>
      <div className="pl-5 pb-2 ">
        <p className="text-gray-100">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam voluptates totam saepe accusantium officiis reprehenderit dignissimos debitis tenetur, deleniti error magni culpa incidunt molestiae? Nam repudiandae deserunt
          corrupti nesciunt cum!
        </p>
      </div>
      <div className="flex pl-5 pb-2">
        <p className="text-slate-400">11:32 PM • March 24, 2025</p>
      </div>
      <div className="flex items-center gap-2 pl-5 pb-5">
        <img src="./src/assets/img/liked.png" alt="" width="2.5%" />
        <p className="text-slate-400">35</p>
        <img src="./src/assets/img/text-bubble.png" className="invert" alt="" width="2.5%" />
        <p className="text-slate-400">200 Replies</p>
      </div>

      <form action="" className="flex gap-5 border-t-1 border-b-1 border-gray-500 p-5">
        <Avatar className="">
          <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
          <AvatarFallback>ZW</AvatarFallback>
        </Avatar>
        <Textarea className="ml-2 resize-none w-xl max-w-xl  border-none shadow-none focus:ring-green-500 items-center text-gray-100 text-xl md:text-xl font-semibold" placeholder="Type your reply"></Textarea>
        <img className="justify-self-end size-10" src="./src/assets/img/add-image-green.png" alt="" />
        <Button variant="circle" className="justify-self-end ">
          Reply
        </Button>
      </form>
    </div>
  );
}

export default PageContent;
