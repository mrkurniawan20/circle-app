import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavLink } from 'react-router-dom';
import SuggestedAccount from './SuggestedAccount';
import EditProfile from './EditProfile';
// import ContainerMyProfile from './ProfileBarContainerMyProfile';
import ContainerCredentials from './ContainerCredentials';
import ContainerMyProfile from './ContainerMyProfile';
import { users } from '@/stores/users';

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
