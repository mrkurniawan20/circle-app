import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import SuggestedAccount from './SuggestedAccount';
import EditProfile from './EditProfile';
// import ContainerMyProfile from './ProfileBarContainerMyProfile';
import ContainerCredentials from './ContainerCredentials';
import ContainerMyProfile from './ContainerMyProfile';

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

function ProfileBar({ showProfileContainer = true }: { showProfileContainer?: boolean }) {
  return (
    <div className="">
      <div className="fixed pl-10 pt-10 pr-10">
        {/* biar bisa dipanggil atau engga */}
        {showProfileContainer && <ContainerMyProfile />}
        <div className="second-profile-container bg-gray-800 mt-5 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-50 pt-5 pb-5  pl-5 pr-5 ">Suggested for you </h3>
          {users.map((user, index) => (
            <SuggestedAccount key={index} page={user.page} image={user.image} fallback={user.fallback} name={user.name} username={user.username} buttonType={user.buttonType} />
          ))}
        </div>
        <ContainerCredentials />
      </div>
    </div>
  );
}

export default ProfileBar;
