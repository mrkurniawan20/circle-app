import CircleText from '@/components/CircleText';
import MainContent from '@/components/MainContent';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import React from 'react';

function Home() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <div></div>
      <MainContent />
      <ProfileBar />
    </div>
  );
}

export default Home;
