import Layout from '@/layouts/Layout';
import { useUserStore } from '@/stores/auth';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '@/utils/useUser';
import LoadingPage from '@/layouts/components/LoadingPage';

interface DecodedProps {
  id: number;
  exp: number;
  verified: boolean;
}

function ProtectedRouteLayout() {
  // const { user } = useUserStore();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // const decoded = jwtDecode<DecodedProps>(token!);
  // const userId = decoded.id;

  const title = document.title;
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [title]);

  function isTokenExpired(token: string): boolean {
    const decoded = jwtDecode<DecodedProps>(token);
    try {
      // console.log(decoded.exp);
      console.log(decoded);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  const { user, loading } = useUser();
  if (loading) {
    return <LoadingPage />;
  }

  //   const isLogin = true;
  // const user = useUser();

  if (!token) {
    return <Navigate to={'/login'} />;
  } else {
    return <Outlet context={{ user }} />;
  }
}

export default ProtectedRouteLayout;
