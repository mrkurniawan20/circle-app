import React from 'react';
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
          <img src="./src/assets/img/header-resized.png" className="aspect-6/2 object-cover rounded-xl" alt="" />
          <img src="./src/assets/img/star platinum.png" className="aspect-square object-cover rounded-full size-20 ml-7 -mt-10 border-3" alt="" />
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="name"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Name
            </label>
            <Input id="name" name="name" defaultValue="Dio Brando 👊🏼" className="col-span-4 p-4 pt-7 text-gray-50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="username"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Username
            </label>
            <Input id="username" name="username" defaultValue="@konodioda" className="col-span-4 p-4 pt-7 text-gray-50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4 relative">
            <label
              htmlFor="bio"
              className="absolute duration-300 transform -translate-y-2 scale-75 top-2 left-3 origin-[0] text-slate-400 px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
            >
              Bio
            </label>
            <Textarea id="bio" name="bio" defaultValue="IT IS ME! DIO" className="resize-none col-span-4 min-h-20 p-4 pt-7 text-gray-50" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" variant={'circle'}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
