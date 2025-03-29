import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea, TweetArea } from './ui/textarea';

function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="garis" className="ms-auto rounded-full">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 border-none">
        <DialogHeader>
          <DialogTitle className="text-gray-100 ">Edit profile</DialogTitle>
          <form action="">
            <label htmlFor="header">
              <img src="./src/assets/img/header-resized.png" className="aspect-6/2 object-cover rounded-xl hover:cursor-pointer hover:brightness-50 transition-all duration-200" alt="" />
            </label>
            <input type="file" name="header" id="header" className="hidden" />
            <label htmlFor="avatar">
              <img
                src="./src/assets/img/star platinum.png"
                className="absolute aspect-square object-cover rounded-full size-20 ml-7 -mt-10 border-4 border-gray-800 hover:cursor-pointer hover:brightness-50 transition-all duration-200"
                alt=""
              />
            </label>
            <input type="file" name="avatar" id="avatar" className="hidden" />
          </form>
        </DialogHeader>
        <form className="mt-5 grid gap-4 py-4">
          <div className="flex flex-col items-center gap-4 relative">
            <label
              htmlFor="name"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Name
            </label>
            <Input id="name" name="name" defaultValue="Dio Brando 👊🏼" className="border-2 focus:border-green-500 focus:outline-none transition-all col-span-4 p-4 pt-7 text-gray-50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="username"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Username
            </label>
            <Input id="username" name="username" defaultValue="@konodioda" className="border-2 focus:border-green-500 focus:outline-none transition-all col-span-4 p-4 pt-7 text-gray-50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="bio"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Bio
            </label>
            <Textarea id="bio" name="bio" defaultValue="IT IS ME! DIO" className="border-2 focus:border-green-500 focus:outline-none transition-all resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50" />
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
