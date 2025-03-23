import React from 'react';
import { Button } from './ui/button';
import { NavLink } from 'react-router-dom';
import CircleText from './CircleText';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function SideBar() {
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 h-screen fixed w-xs">
        <a href="" className="hover:scale-105 transition-transform duration-200">
          <CircleText textSize="text-5xl" />
        </a>
        <NavLink to={'/Home'} className="flex flex-row items-center p-2 hover:rounded-full hover:bg-slate-700 ">
          <img className="invert" src="./src/assets/img/home.png" alt="" width="10%" />
          &emsp;<p className="text-lg font-semibold invert">Home</p>
        </NavLink>
        <NavLink to={'/Home'} className="flex flex-row items-center  p-2 hover:rounded-full hover:bg-slate-700 ">
          <img className="invert" src="./src/assets/img/search.png" alt="" width="10%" />
          &emsp;<p className="text-lg font-semibold invert">Search</p>
        </NavLink>
        <NavLink to={'/Home'} className="flex flex-row items-center  p-2 hover:rounded-full hover:bg-slate-700 ">
          <img className="invert" src="./src/assets/img/follow.png" alt="" width="10%" />
          &emsp;<p className="text-lg font-semibold invert">Follow</p>
        </NavLink>
        <NavLink to={'/Home'} className="flex flex-row items-center  p-2 hover:rounded-full hover:bg-slate-700 ">
          <img className="invert" src="./src/assets/img/profile.png" alt="" width="10%" />
          &emsp;<p className="text-lg font-semibold invert">Profile</p>
        </NavLink>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'circle'} className="p-5">
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-gray-800 border-none">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-[1fr_10fr] items-center">
                {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
                <Avatar className="my-auto">
                  <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
                  <AvatarFallback>ZW</AvatarFallback>
                </Avatar>
                <Textarea className="ml-2 resize-none w-sm max-w-sm border-none shadow-none focus:ring-green-500 items-center text-gray-100" placeholder="What is happening?"></Textarea>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <img className="me-auto invert-50" src="./src/assets/img/add-image.png" alt="" width="8%" />
              <Button variant={'circle'} type="submit">
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="flex-grow"></div>
        <NavLink to={'/logout'} className="flex flex-row items-center sideBar mb-15">
          <img className="invert" src="./src/assets/img/logout.png" alt="" width="10%" />
          &emsp;<p className="text-lg font-semibold invert">logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
