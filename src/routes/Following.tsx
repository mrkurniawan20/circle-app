import CircleText from '@/components/CircleText';
import ContentFollow from '@/components/ContentFollow';
import ContentFollowing from '@/components/ContentFollowing';
import ContentHome from '@/components/ContentHome';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React from 'react';

function Following() {
  return (
    // <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
    //   <SideBar />
    //   <ContentFollowing />
    //   <ProfileBar />
    // </div>
    <Layout>
      <ContentFollowing />
    </Layout>
  );
}

export default Following;
