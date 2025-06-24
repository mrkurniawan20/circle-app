import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';
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
import { Separator } from '@/components/ui/separator';
import { loggedInUser } from '@/stores/loggedInUser';
import axios from 'axios';
import { User, UserProps } from '@/utils/setUser';
import LoadingPage from './LoadingPage';

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

function SideBar({ user }: UserProps) {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{ post: string; image?: File }>({
    post: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(formData);
  }
  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    console.log('cek', files);

    console.log('File selected:', files?.[0]); // ✅ always logs if input triggered
    if (files![0].size > 5 * 1024 * 1024) {
      alert('File is too large');
    }
    if (files) {
      console.log(formData);
      setFormData((prev) => ({ ...prev, image: files[0] }));
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    if (formData.post) data.append('post', formData.post);
    if (formData.image) data.append('image', formData.image);
    try {
      await axios.post('http://localhost:3320/post/posttweet', data, { headers: { Authorization: `Bearer ${token}` } });
      setFormData({ post: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  async function logOut() {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3320/user/logoutUser', token, { headers: { Authorization: `Bearer ${token}` } });
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <div className="p-10 pt-0 2xl:max-w-[250px] ms-auto">
      <div className="flex flex-col gap-5 max-w-xs sticky top-10 left-0">
        <NavLink to={'/'} className="hover:scale-105 transition-transform duration-200">
          <CircleText textSize="text-5xl px-3" />
        </NavLink>
        <SideBarPage profiles={pages} />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={'circle'} className="p-5 px-10 max-w-fit">
              Create Post
            </Button>
          </DialogTrigger>
          {loading ? (
            <DialogContent>
              <LoadingPage />
            </DialogContent>
          ) : (
            <DialogContent className="sm:max-w-[525px] md:min-w-[700px] bg-gray-800 border-none top-[25%]">
              <form action="" onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-[1fr_10fr] items-center">
                    <Avatar className="my-auto">
                      <AvatarImage src={`/src/uploads/${user.avatar}`} alt="@shadcn" />
                      <AvatarFallback>ZW</AvatarFallback>
                    </Avatar>
                    <Input
                      name="post"
                      value={formData.post}
                      onChange={handleChange}
                      className="ml-2 resize-none w-sm max-w-sm border-none shadow-none focus:ring-green-500 items-center text-gray-100 md:text-xl"
                      placeholder="What is happening?"
                    ></Input>
                  </div>
                </div>
                <Separator className="mb-5 " />
                <DialogFooter className="flex">
                  <div className="mr-auto">
                    <label htmlFor="imageDialog">
                      <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800  duration-200" />
                    </label>
                    <Input type="file" name="imageDialog" id="imageDialog" className="hidden" onChange={handleFile} />
                  </div>
                  <Button variant={'circle'} type="submit">
                    Post
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>
        <div className="flex-grow"></div>
        <button onClick={logOut} className="flex flex-row items-center  max-w-fit space-x-5 py-2 px-3 hover:bg-slate-700 rounded-full duration-200">
          <DoorOpen className="size-8 text-gray-50" />
          <p className="text-xl font-semibold text-gray-100">logout</p>
        </button>
        {/* <NavLink to={'/login'} onClick={logOut} className="flex flex-row items-center  max-w-fit space-x-5 py-2 px-3 hover:bg-slate-700 rounded-full duration-200">
          <DoorOpen className="size-8 text-gray-50" />
          <p className="text-xl font-semibold text-gray-100">logout</p>
        </NavLink> */}
      </div>
    </div>
  );
}

export default SideBar;
