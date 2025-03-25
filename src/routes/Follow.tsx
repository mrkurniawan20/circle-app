import CircleText from '@/components/CircleText';
import ContentFollow from '@/components/ContentFollow';
import ContentHome from '@/components/ContentHome';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import React from 'react';

function Follow() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <ContentFollow />
      <ProfileBar />
    </div>
  );
}

export default Follow;
