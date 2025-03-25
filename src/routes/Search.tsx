import React from 'react';
import CircleText from '@/components/CircleText';
import ContentPage from '@/components/ContentPage';
import ProfileBar from '@/components/ProfileBar';
import SideBar from '@/components/SideBar';
import ContentSearch from '@/components/ContentSearch';

function Search() {
  return (
    <div>
      <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
        <SideBar />
        <ContentSearch />
        {/* <ContentPage /> */}
        <ProfileBar />
      </div>
    </div>
  );
}

export default Search;
