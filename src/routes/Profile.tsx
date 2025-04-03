import DataMyProfile from '@/components/DataMyProfile';
import EditProfile from '@/components/EditProfile';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import ThreadList from '@/components/ThreadList';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { threads } from '@/stores/threads';
import Layout from '@/layouts/Layout';
import { loggedInUser } from '@/stores/loggedInUser';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';

function Profile() {
  return (
    <Layout showProfileContainer={false}>
      <div>
        <div className="inline-flex">
          <NavLink to={'/home'} className="inline-flex items-center pt-10">
            <div className="flex items-center space-x-3 hover:rounded-full pr-5 pl-5 pt-1 pb-1 hover:bg-slate-700">
              <ArrowLeft className="size-8 text-gray-50" />

              <h2 className="text-2xl text-gray-100 font-semibold">{loggedInUser[0].name}</h2>
            </div>
          </NavLink>
        </div>
        <div className="p-10 pb-0 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <img src={`./src/assets/img/${loggedInUser[0].header}`} alt="" className="aspect-5/1 object-cover rounded-2xl hover:cursor-pointer" />
            </DialogTrigger>
            <DialogOverlay className="bg-black/80">
              <DialogContent className="border-none md:min-w-full p-1 rounded-none ">
                <img src={`./src/assets/img/${loggedInUser[0].header}`} alt="" className="aspect-5/1 object-cover" />
              </DialogContent>
            </DialogOverlay>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <img src={`./src/assets/img/${loggedInUser[0].avatar}`} alt="" className="aspect-square object-cover size-25 rounded-full border-5 border-[#213547] ml-10 -mt-12 absolute hover:brightness-90 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogOverlay className="bg-black/80">
              <DialogContent className="border-none md:w-fit p-1 rounded-full ">
                <img src={`./src/assets/img/${loggedInUser[0].avatar}`} alt="" className="aspect-square object-cover size-full rounded-full" />
              </DialogContent>
            </DialogOverlay>
          </Dialog>
          <div className="flex pt-3 pb-5">
            <EditProfile />
          </div>
          <DataMyProfile loggedIn={loggedInUser} />{' '}
        </div>
        <div className="grid grid-cols-[1fr_1fr]  pr-5 pl-5 border-b-1 border-gray-500">
          <NavLink to={'/profile'} className="text-center text-xl text-gray-50 ">
            <p className="pt-3 pb-3  hover:bg-slate-700 rounded-lg duration-150">All Post</p>
            <div className="border-2 border-green-500 h-1 rounded-full"></div>
          </NavLink>
          <NavLink to={'/profilemedia'} className="text-center text-xl text-gray-50">
            <p className="pt-3 pb-3  hover:bg-slate-700 duration-150 rounded-lg">Media</p>
          </NavLink>
        </div>
        <ThreadList threadList={threads} />
      </div>
    </Layout>
  );
}

export default Profile;
