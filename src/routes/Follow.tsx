import CircleText from '@/components/CircleText';
import ContentFollow from '@/components/ContentFollow';
import ContentHome from '@/components/ContentHome';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React from 'react';

function Follow() {
  return (
    // <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
    //   <SideBar />
    //   <ContentFollow />
    //   <ProfileBar />
    // </div>
    <Layout>
      <ContentFollow />
    </Layout>
  );
}

export default Follow;
