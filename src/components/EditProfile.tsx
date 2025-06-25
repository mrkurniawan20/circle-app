import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea, TweetArea } from './ui/textarea';
import { ImagePlus } from 'lucide-react';
import { loggedInUser } from '@/stores/loggedInUser';
import { UserProps, useUser } from '@/utils/setUser';
import axios from 'axios';

function EditProfile({ user }: UserProps) {
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    username: string;
    bio: string;
    avatar?: File;
    header?: File;
  }>({
    name: '',
    username: '',
    bio: '',
  });
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleFileChange(field: `avatar` | `header`) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files![0].size > 5 * 1024 * 1024) {
        alert('File is too large');
      }
      if (files) {
        setFormData((prev) => ({ ...prev, [field]: files![0] }));
      }
    };
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.username) data.append('username', formData.username);
      if (formData.bio) data.append('bio', formData.bio);
      if (formData.avatar) data.append('avatar', formData.avatar);
      if (formData.header) data.append('header', formData.header);
      await axios.patch(`http://localhost:3320/user/editprofile/${user.id}`, data, { headers: { Authorization: `Bearer ${token}` } });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="garis" className="ms-auto rounded-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none top-[35%]">
        <DialogHeader>
          <DialogTitle className="text-gray-100 ">Edit profile</DialogTitle>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="header" className="relative hover:brightness-50 duration-200 hover:cursor-pointer">
              <img src={`${user!.header}`} className="aspect-6/2 object-cover rounded-xl " alt="" />
              <ImagePlus className="text-gray-50 absolute inset-0 m-auto bg-black size-12 p-3 rounded-full opacity-70 hover:cursor-pointer" />
            </label>
            <input onChange={handleFileChange('header')} type="file" name="header" id="header" className="hidden" />
            <div className="sm:max-w-fit ml-7 -mt-10">
              <label htmlFor="avatar" className="relative hover:brightness-50 duration-200 hover:cursor-pointer md:max-w-10 ">
                <img src={`${user!.avatar}`} className="aspect-square object-cover rounded-full size-20  border-4 border-gray-800 " alt="" />
                <ImagePlus className="text-gray-50 absolute inset-0 m-auto bg-black size-8 p-1 rounded-full opacity-70 hover:cursor-pointer" />
              </label>
              <input onChange={handleFileChange('avatar')} type="file" name="avatar" id="avatar" className="hidden" />
            </div>
          </form>
        </DialogHeader>
        <form className=" grid gap-4 " onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 relative">
            <label
              htmlFor="name"
              className="absolute duration-300  -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Name
            </label>
            <Input value={formData.name} onChange={handleChange} id="name" name="name" defaultValue={`${user!.name}`} className="border-2 focus:border-green-500 focus:outline-none transition-all col-span-4 p-4 pt-7 text-gray-50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="username"
              className="absolute duration-300  -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Username
            </label>
            <Input
              value={formData.username}
              onChange={handleChange}
              id="username"
              name="username"
              defaultValue={`${user!.username}`}
              className="border-2 focus:border-green-500 focus:outline-none transition-all col-span-4 p-4 pt-7 text-gray-50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="bio"
              className="absolute duration-300  -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Bio
            </label>
            <Input
              value={formData.bio}
              onChange={handleChange}
              id="bio"
              name="bio"
              defaultValue={`${user!.bio}`}
              className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50"
            />
          </div>
          <div className="ms-auto">
            <Button className="ms-auto" type="submit" variant={'circle'}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
