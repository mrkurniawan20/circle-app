import CircleText from '@/components/CircleText';
import ContentPage from '@/layouts/components/ContentPage';
import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import Layout from '@/layouts/Layout';
import React from 'react';
import PageMedia from './PageMedia';
import { threads } from '@/stores/threads';
import { useLocation } from 'react-router-dom';

interface PageIndex {
  index: number;
}

function Page({ index }: PageIndex) {
  const location = useLocation();
  index = location.state?.index;

  return (
    <Layout>
      <ContentPage index={index} />
      {/* <PageMedia image={image} /> */}
    </Layout>
  );
}

export default Page;
