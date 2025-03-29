import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children, showProfileContainer = true }: LayoutProps & { showProfileContainer?: boolean }) {
  return (
    <div className="grid grid-cols-[0.4fr_1fr_0.6fr]">
      <SideBar />
      <div className="border-l-1 border-r-1 border-gray-500 min-h-screen">{children}</div>
      <ProfileBar showProfileContainer={showProfileContainer} />
    </div>
  );
}

export default Layout;
