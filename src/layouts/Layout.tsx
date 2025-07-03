import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import SideBar from '@/layouts/components/SideBar';
import ProfileBar from '@/layouts/components/ProfileBar';
import LoadingPage from './components/LoadingPage';
import { useUser } from '@/utils/useUser';

interface LayoutProps {
  children: React.ReactNode;
  showProfileContainer?: boolean;
  minimal?: boolean;
}

function Layout({ children, showProfileContainer = true, minimal = false }: LayoutProps) {
  const { user, loading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <LoadingPage />;

  if (minimal) {
    return (
      <div className="min-h-screen flex justify-center px-4 xl:grid xl:grid-cols-[250px_600px_auto] 2xl:grid-cols-[0.4fr_1fr_0.4fr]">
        <div className="hidden xl:block" />
        <div className="w-full max-w-full xl:border-x border-gray-500">{children}</div>
        <div className="hidden xl:block" />
      </div>
    );
  }

  return (
    <>
      <div className="xl:hidden flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#213547] dark:bg-background sticky top-0 z-20">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu className="h-6 w-6 text-green-500 " />
        </button>
        <span className="text-lg font-semibold text-green-500 ">Circle</span>
        <div className="w-6" />
      </div>

      <div className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} xl:hidden`} onClick={() => setSidebarOpen(false)}>
        <div className={`absolute left-0 top-0 h-full w-64 bg-[#213547] dark:bg-background transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <SideBar user={user!} />
        </div>
      </div>

      <div className="2xl:grid 2xl:grid-cols-[0.5fr_1fr_0.7fr] xl:grid xl:grid-cols-[250px_1fr_430px]">
        <div className="hidden xl:block ml-auto">
          <SideBar user={user!} />
        </div>

        <div className="w-full max-w-full xl:border-x border-gray-500">{children}</div>

        <div className="hidden xl:block mr-auto">
          <ProfileBar showProfileContainer={showProfileContainer} />
        </div>
      </div>
    </>
  );
}

export default Layout;
