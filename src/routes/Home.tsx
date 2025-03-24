import CircleText from '@/components/CircleText';
import HomeContent from '@/components/HomeContent';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import React from 'react';

function Home() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <HomeContent />
      <ProfileBar />
    </div>
  );
}

export default Home;
