import CircleText from '@/components/CircleText';
import MainContent from '@/components/MainContent';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import React from 'react';

function Home() {
  return (
    <div className="app-layout">
      <SideBar />
      <MainContent />
      <ProfileBar />
    </div>
  );
}

export default Home;
