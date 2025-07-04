import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ImagePlus, Loader2 } from 'lucide-react';
import { UserProps } from '@/utils/useUser';
import { api } from '@/services/api';

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
    name: user.name,
    username: user.username,
    bio: user.bio,
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const [headerPreview, setHeaderPreview] = useState(user.header);
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(field: 'avatar' | 'header') {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      if (files[0].size > 5 * 1024 * 1024) {
        alert('File is too large, maximum file size allowed is 5MB');
        return;
      }
      const file = files[0];
      setFormData((prev) => ({ ...prev, [field]: files[0] }));
      const url = URL.createObjectURL(file);
      if (field === 'avatar') setAvatarPreview(url);
      if (field === 'header') setHeaderPreview(url);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setIsEditing(true);
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.username) data.append('username', formData.username);
      if (formData.bio) data.append('bio', formData.bio);
      if (formData.avatar) data.append('avatar', formData.avatar);
      if (formData.header) data.append('header', formData.header);
      await api.patch(`/user/editprofile/${user.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsEditing(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="garis" className="ms-auto rounded-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none top-[50%]">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Edit profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <>
            <label htmlFor="header" className="relative hover:brightness-50 duration-200 hover:cursor-pointer rounded-xl overflow-hidden">
              <img src={headerPreview} className="aspect-[6/2] object-cover w-full rounded-xl" alt="" />
              <ImagePlus className="absolute right-42 bottom-15 bg-black/60 rounded-full size-8 p-1 text-white hover:scale-110 transition" strokeWidth={2} />
            </label>
            <input onChange={handleFileChange('header')} type="file" name="header" id="header" className="hidden" />

            <div className="relative w-fit mx-auto -mt-10">
              <label htmlFor="avatar" className="hover:brightness-50 hover:cursor-pointer duration-200 relative">
                <img src={avatarPreview} className="w-20 h-20 object-cover rounded-full border-4 border-gray-800" alt="" />
                <ImagePlus className="absolute right-7 bottom-7 bg-black/60 rounded-full size-6 p-1 text-white hover:scale-110 transition" strokeWidth={2} />
              </label>
              <input onChange={handleFileChange('avatar')} type="file" name="avatar" id="avatar" className="hidden" />
            </div>

            <div className="relative">
              <label htmlFor="name" className="absolute text-slate-400 text-sm ">
                Name
              </label>
              <Input value={formData.name} onChange={handleChange} id="name" name="name" className="border-2 mt-6 p-4  text-gray-50 focus:border-green-500 focus:outline-none" />
            </div>

            <div className="relative">
              <label htmlFor="username" className="absolute text-slate-400 text-sm ">
                Username
              </label>
              <Input value={formData.username} onChange={handleChange} id="username" name="username" className="border-2 mt-6 p-4  text-gray-50 focus:border-green-500 focus:outline-none" />
            </div>

            <div className="relative">
              <label htmlFor="bio" className="absolute text-slate-400 text-sm ">
                Bio
              </label>
              <Input value={formData.bio} onChange={handleChange} id="bio" name="bio" className="border-2 mt-6 p-4  min-h-[80px] text-gray-50 focus:border-green-500 focus:outline-none" />
            </div>

            <div className="ms-auto mt-2">
              <Button type="submit" variant="circle" disabled={loading}>
                {isEditing ? <Loader2 className="h-10 w-10 animate-spin text-gray-500" /> : `Save`}
              </Button>
            </div>
          </>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
