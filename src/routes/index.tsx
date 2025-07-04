import { createBrowserRouter, Outlet } from 'react-router-dom';
import Register from './auth/Register';
import { LoginForm } from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import Home from './Home';
import Page from './Page';
import Search from './Search';
import Following from './Following';
import ProtectedRouteLayout from './ProtectedRoute';
import PageTitle from '@/layouts/components/PageTitle';
import Followers from './Followers';
import LoadingPage from '@/layouts/components/LoadingPage';
import ProfileUsername from './ProfileUsername';
import ProfileMediaUsername from './ProfileMediaUsername';
import NotFound from './NotFound';
import EditPassword from './EditPassword';
import Layout from '@/layouts/Layout';

let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [
          {
            path: '/followers/:username',
            Component: PageTitle(Followers, 'Followers | Circle'),
          },
          {
            path: '/following/:username',
            Component: PageTitle(Following, 'Following | Circle'),
          },
          {
            path: '/home',
            Component: PageTitle(Home, 'Home | Circle'),
          },
          {
            path: '/search',
            Component: PageTitle(Search, 'Search | Circle'),
          },
          {
            path: '/edit',
            Component: PageTitle(EditPassword, 'Edit Password | Circle'),
          },

          {
            path: '/profile/:username',
            Component: ProfileUsername,
          },
          {
            path: '/media/:username',
            Component: PageTitle(ProfileMediaUsername, 'Profile | Circle'),
          },
        ],
      },
      {
        path: '/page/:id',
        Component: PageTitle(Page, 'Page | Circle'),
      },
    ],
  },
  {
    path: '/register',
    Component: PageTitle(Register, 'Register | Circle'),
  },
  {
    path: '/login',
    Component: PageTitle(LoginForm, 'Login | Circle'),
  },
  {
    path: '/',
    Component: PageTitle(LoginForm, 'Login | Circle'),
  },
  {
    path: '/forgot',
    Component: PageTitle(ForgotPassword, 'Forgot Password | Circle'),
  },
  {
    path: '/reset',
    Component: PageTitle(ResetPassword, 'Reset Password | Circle'),
  },
  // {
  //   path: '/page/:id',
  //   Component: PageTitle(Page, 'Page | Circle'),
  // },
  // {
  //   path: '/profile/:username',
  //   Component: ProfileUsername,
  // },
  // {
  //   path: '/media/:username',
  //   Component: PageTitle(ProfileMediaUsername, 'Profile | Circle'),
  // },
  {
    path: '/loading',
    Component: LoadingPage,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

export default router;
