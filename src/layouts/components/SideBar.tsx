import React from 'react';
import { Button } from '../../components/ui/button';
import { NavLink } from 'react-router-dom';
import CircleText from '../../components/CircleText';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SideBarPage from '../../components/SideBarPage';
import EditProfile from '../../components/EditProfile';
import { useUserStore } from '@/stores/auth';
import { ImagePlus, DoorOpen, CircleUserRound } from 'lucide-react';
import { FaHome, FaSearch, FaRegHeart } from 'react-icons/fa';
import { IoPersonCircleOutline, IoPersonCircleSharp } from 'react-icons/io5';
import { GiExitDoor } from 'react-icons/gi';

const pages = [
  {
    page: 'home',
    image: <FaHome />,
    namePage: 'Home',
  },
  {
    page: 'search',
    image: <FaSearch />,
    namePage: 'Search',
  },
  {
    page: 'follow',
    image: <FaRegHeart />,
    namePage: 'Follow',
  },
  {
    page: 'profile',
    image: <IoPersonCircleSharp />,
    namePage: 'Profile',
  },
];

function SideBar() {
  const { clearUser } = useUserStore();
  return (
    <div className="p-10">
      <div className="flex flex-col gap-5 h-screen fixed w-xs">
        <NavLink to={'/'} className="hover:scale-105 transition-transform duration-200">
          <CircleText textSize="text-5xl" />
        </NavLink>
        <SideBarPage profiles={pages} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'circle'} className="p-5">
              Create Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px] bg-gray-800 border-none">
            <form action="">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-[1fr_10fr] items-center">
                  <Avatar className="my-auto">
                    <AvatarImage src="./src/assets/img/star platinum.png" alt="@shadcn" />
                    <AvatarFallback>ZW</AvatarFallback>
                  </Avatar>
                  <Textarea className="ml-2 resize-none w-sm max-w-sm border-none shadow-none focus:ring-green-500 items-center text-gray-100 md:text-xl" placeholder="What is happening?"></Textarea>
                </div>
              </div>
              <DialogFooter className="flex">
                <div className="mr-auto">
                  <label htmlFor="add-image">
                    <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 transform-all duration-200" />
                  </label>
                  <input type="file" name="add-image" id="add-image" className="hidden" />
                </div>
                <Button variant={'circle'} type="submit">
                  Post
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <div className="flex-grow"></div>
        <NavLink to={'/login'} onClick={clearUser} className="flex flex-row items-center mb-15 max-w-fit space-x-5 p-2 px-4 hover:bg-slate-700 rounded-full duration-200">
          <DoorOpen className="size-8 text-gray-50" />
          <p className="text-xl font-semibold text-gray-100">logout</p>
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;
