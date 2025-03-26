import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children, showProfileContainer = true }: LayoutProps & { showProfileContainer?: boolean }) {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr] h-screen">
      <SideBar />
      <div>{children}</div>
      <ProfileBar showProfileContainer={showProfileContainer} />
    </div>
  );
}

export default Layout;
