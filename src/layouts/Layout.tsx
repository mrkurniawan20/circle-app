import ProfileBar from '@/layouts/components/ProfileBar';
import SideBar from '@/layouts/components/SideBar';
import { useUser } from '@/utils/setUser';
import React from 'react';
import LoadingPage from './components/LoadingPage';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children, showProfileContainer = true, minimal = false }: LayoutProps & { showProfileContainer?: boolean; minimal?: boolean }) {
  const { user, loading } = useUser();
  if (loading) {
    return <LoadingPage />;
  }

  if (minimal) {
    return (
      <div className="2xl:grid 2xl:grid-cols-[0.4fr_1fr_0.4fr] xl:grid xl:grid-cols-[250px_600px_auto]">
        <div /> {/* Empty left col */}
        <div className="border-l-1 border-r-1 border-gray-500 min-h-screen">{children}</div>
        <div /> {/* Empty right col */}
      </div>
    );
  }

  return (
    <div className="2xl:grid 2xl:grid-cols-[0.4fr_1fr_0.4fr] xl:grid xl:grid-cols-[250px_600px_auto]">
      <SideBar user={user!} />
      <div className="border-l-1 border-r-1 border-gray-500 min-h-screen">{children}</div>
      <ProfileBar showProfileContainer={showProfileContainer} />
    </div>
  );
}

export default Layout;
