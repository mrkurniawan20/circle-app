import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { NavLink, useNavigate } from 'react-router-dom';
import CircleText from '../../components/CircleText';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SideBarPage from '../../components/SideBarPage';
import { ImagePlus, DoorOpen, CircleX } from 'lucide-react';
import { FaHome, FaSearch, FaRegHeart } from 'react-icons/fa';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Separator } from '@/components/ui/separator';
import { UserProps } from '@/utils/useUser';
import LoadingPage from './LoadingPage';
import { api } from '@/services/api';

function SideBar({ user }: UserProps) {
  const pages = [
    { page: 'home', image: <FaHome />, namePage: 'Home' },
    { page: 'search', image: <FaSearch />, namePage: 'Search' },
    { page: `followers/${user.username}`, image: <FaRegHeart />, namePage: 'Follow' },
    { page: `profile/${user.username}`, image: <IoPersonCircleSharp />, namePage: 'Profile' },
  ];

  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{ post: string; image?: File }>({ post: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    const value = e.target.value;
    setButtonDisabled(value.trim() === '' && !formData.image);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files[0].size > 5 * 1024 * 1024) {
      alert('File is too large');
    }
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setButtonDisabled(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    if (formData.post) data.append('post', formData.post);
    if (formData.image) data.append('image', formData.image);

    try {
      await api.post(`/post/posttweet`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ post: '' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logOut() {
    await api.post(`/user/logoutUser`, token, {
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <div className="p-6 pt-2 max-w-full h-full">
      <div className="flex flex-col gap-5 sticky top-5">
        {/* Logo / Home Link */}
        <NavLink to="/" className="hover:scale-105 transition-transform duration-200 w-fit">
          <CircleText textSize="text-5xl px-3" />
        </NavLink>

        {/* Navigation Pages */}
        <SideBarPage profiles={pages} />

        {/* Create Post Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="circle" className="p-5 px-10 max-w-fit">
              Create Post
            </Button>
          </DialogTrigger>

          {loading ? (
            <DialogContent>
              <LoadingPage />
            </DialogContent>
          ) : (
            <DialogContent className="sm:max-w-[525px] md:min-w-[700px] bg-gray-800 border-none top-[50%] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className=" items-center">
                    <Avatar className="my-auto">
                      <AvatarImage src={user.avatar} alt="@user" className="object-cover" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Input name="post" value={formData.post} onChange={handleChange} className="py-10 px-0 resize-none w-full border-none shadow-none focus:ring-green-500 text-gray-100 md:text-xl" placeholder="What is happening?" />
                    {formData.image && (
                      <div className="mt-3 relative w-fit">
                        <CircleX
                          className="absolute -top-2 -right-2 text-gray-50 bg-black hover:bg-gray-600 hover:cursor-pointer size-5 p-1 rounded-full"
                          onClick={() => {
                            setButtonDisabled(true);
                            setFormData((prev) => ({ ...prev, image: undefined }));
                          }}
                        />
                        <img src={URL.createObjectURL(formData.image)} alt="Preview" className="max-w-[200px] rounded-lg" />
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="mb-5" />
                <DialogFooter className="flex">
                  <div className="mr-auto">
                    <label htmlFor="imageDialog">
                      <ImagePlus className="size-10 text-green-500 hover:cursor-pointer hover:text-green-800 duration-200" />
                    </label>
                    <Input type="file" name="imageDialog" id="imageDialog" className="hidden" onChange={handleFile} />
                  </div>
                  <Button variant="circle" type="submit" disabled={buttonDisabled}>
                    Post
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          )}
        </Dialog>

        {/* Push logout to bottom (if enough height) */}
        <div className="flex-grow" />

        {/* Logout Button */}
        <button onClick={logOut} className="flex items-center max-w-fit space-x-4 py-2 px-3 hover:bg-slate-700 rounded-full duration-200">
          <DoorOpen className="size-6 text-gray-50" />
          <span className="text-lg font-medium text-gray-100">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
