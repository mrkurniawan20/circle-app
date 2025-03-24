import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import SuggestedAccount from './SuggestedAccount';

const users = [
  {
    page: 'bucciaratti',
    image: 'sticky finger',
    fallback: 'B',
    name: 'Bucciaratti',
    username: 'StickyFinger',
    buttonType: 'followed' as 'followed' | 'follow',
  },
  {
    page: 'giorno',
    image: 'golden requim',
    fallback: 'GG',
    name: 'Giorno',
    username: 'GoldenRequim',
    buttonType: 'follow' as 'follow' | 'followed',
  },
  {
    page: 'anasui',
    image: 'diver down',
    fallback: 'A',
    name: 'Anasui',
    username: 'Diver Down',
    buttonType: 'follow' as 'follow' | 'followed',
  },
  {
    page: 'polpo',
    image: 'black sabbath',
    fallback: 'P',
    name: 'Polpo',
    username: 'Black Sabbath',
    buttonType: 'follow' as 'follow' | 'followed',
  },
  {
    page: 'Blackmore',
    image: 'rainbow',
    fallback: 'B',
    name: 'Blackmore',
    username: 'CatchTheRainbow',
    buttonType: 'follow' as 'follow' | 'followed',
  },
];

function ProfileBar() {
  return (
    <div className="pl-10 pt-10">
      <div className="fixed pr-10">
        <div className="first-profile-container bg-gray-800 pl-5 pr-5 rounded-xl">
          <h3 className="pt-3 pb-3 text-gray-100 text-xl font-semibold">My Profile</h3>
          <img src="./src/assets/img/header-resized.png" alt="" className="aspect-5/1 overflow-hidden object-cover rounded-xl" />
          <img src="./src/assets/img/star platinum.png" alt="" width="15%" className="aspect-square object-cover rounded-full border-3 -mt-10 ml-4 absolute" />
          <div className="flex pt-3">
            <Button variant={'garis'} className="ms-auto rounded-full">
              Edit Profile
            </Button>
          </div>
          <h2 className="text-gray-50 pb-1 text-2xl font-semibold">Dio Brando👊🏼</h2>
          <p className="text-slate-400 text-sm pb-1">@konodioda</p>
          <p className="text-gray-100 pb-1">IT IS ME! DIO! </p>
          <div className="flex gap-10 pb-5">
            <div className="flex gap-2">
              <span className="text-gray-100">1</span>
              <p className="text-slate-400">Following</p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-100">30M</span>
              <p className="text-slate-400">Followers</p>
            </div>
          </div>
        </div>
        <div className="second-profile-container bg-gray-800 mt-5 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-50 pt-5 pb-5  pl-5 pr-5 ">Suggested for you </h3>
          {users.map((user, index) => (
            <SuggestedAccount key={index} page={user.page} image={user.image} fallback={user.fallback} name={user.name} username={user.username} buttonType={user.buttonType} />
          ))}
        </div>
        <div className="third-profile-container bg-gray-800 mt-5 pl-3 pr-3 rounded-xl">
          <div className="pt-5 pb-5">
            <div className="flex">
              <h4 className="my-auto text-gray-50 font-semibold">Developed by Rafli Kurniawan&ensp;•&ensp;</h4>
              <div className="flex gap-3">
                <a className="p-0 m-0 size-7" href="">
                  <img className="grayscale hover:grayscale-0" src="./src/assets/img/github.png" alt="" />
                </a>
                <a className="p-0 m-0 size-7" href="">
                  <img className="grayscale hover:grayscale-0" src="./src/assets/img/linkedin.png" alt="" />
                </a>
                <a className="p-0 m-0 size-7" href="">
                  <img className="grayscale hover:grayscale-0" src="./src/assets/img/twitter.png" alt="" />
                </a>
                <a className="p-0 m-0 size-7" href="">
                  <img className="grayscale hover:grayscale-0" src="./src/assets/img/facebook.png" alt="" />
                </a>
              </div>
            </div>
            <div>
              <p className=" flex items-center text-xs text-slate-400 pt-2">
                Powered by <img className="p-0 m-0 w-5 ml-1 mr-1 align-middle" src="./src/assets/img/dw.png" alt="" /> DumbWays Indonesia • #1 Coding Bootcamp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;
