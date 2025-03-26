import CircleText from '@/components/CircleText';
import ContentHome from '@/components/ContentHome';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React from 'react';

function Home() {
  return (
    <Layout>
      <ContentHome />
      {/* <SideBar /> */}
      {/* <ProfileBar /> */}
    </Layout>
  );
}

export default Home;
