import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '@/utils/useUser';
import LoadingPage from '@/layouts/components/LoadingPage';
import Layout from '@/layouts/Layout';
import GuestLayout from '@/layouts/GuestLayout';

interface DecodedProps {
  id: number;
  exp: number;
  verified: boolean;
}

function ProtectedRouteLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { user, loading } = useUser();

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
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  if (loading) {
    return <LoadingPage />;
  }
  if (!token) {
    return (
      <GuestLayout>
        <Outlet />
      </GuestLayout>
    );
  }
  // else if (hasImage) {
  //   return <Outlet />;
  // }
  else {
    return (
      <Layout>
        <Outlet context={{ user }} />
      </Layout>
    );
  }
}

export default ProtectedRouteLayout;
