import React from 'react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import SuggestedAccount from '../../components/SuggestedAccount';
import EditProfile from '../../components/EditProfile';
// import ContainerMyProfile from './ProfileBarContainerMyProfile';
import ContainerCredentials from '../../components/ContainerCredentials';
import ContainerMyProfile from '../../components/ContainerMyProfile';
import { users } from '@/stores/users';

function ProfileBar({ showProfileContainer = true }: { showProfileContainer?: boolean }) {
  return (
    <div className="w-full relative">
      <div className="fixed flex flex-col  pt-10 pl-8 pr-10 w-xl">
        {/* biar bisa dipanggil atau engga */}
        {showProfileContainer && <ContainerMyProfile />}
        <div className="second-profile-container bg-gray-800 mt-5 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-50 pt-5 pb-5  pl-5 pr-5 ">Suggested for you </h3>
          <SuggestedAccount avatars={users} />
        </div>
        <ContainerCredentials />
      </div>
    </div>
  );
}

export default ProfileBar;
