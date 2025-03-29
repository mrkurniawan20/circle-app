import CircleText from '@/components/CircleText';
import ContentPage from '@/components/ContentPage';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React from 'react';

function Home() {
  return (
    <Layout>
      <ContentPage />
    </Layout>
    // <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
    //   <SideBar />
    //   <ProfileBar />
    // </div>
  );
}

export default Home;
