import CircleText from '@/components/CircleText';
import ContentPage from '@/components/ContentPage';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import React from 'react';

function Home() {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <ContentPage />
      <ProfileBar />
    </div>
  );
}

export default Home;
