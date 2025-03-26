import { useUserStore } from '@/stores/auth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRouteLayout() {
  const { user } = useUserStore();
  //   const isLogin = true;

  if (user) {
    return (
      <div>
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to={'/login'} />;
  }
}

export default ProtectedRouteLayout;
