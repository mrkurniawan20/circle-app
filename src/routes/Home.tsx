import CircleText from '@/components/CircleText';
import ContentHome from '@/layouts/components/ContentHome';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import { User } from '@/utils/setUser';
import React from 'react';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const { user } = useOutletContext<{ user: User }>();
  return (
    <Layout>
      <ContentHome user={user} />;
    </Layout>
  );
}

export default Home;
