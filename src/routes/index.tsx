import { createBrowserRouter } from 'react-router-dom';
import Register from './auth/Register';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
// import Login from './auth/DeprecatedLogin';
import Home from './Home';
import Page from './Page';
import Profile from './Profile';
import ProfileMedia from './ProfileMedia';
import Search from './Search';
import Follow from './Follow';
import Following from './Following';
import ProtectedRouteLayout from './ProtectedRoute';
import LoginForm from '@/components/auth/MyForm';
import PageMedia from './PageMedia';
import PageTitle from '@/layouts/components/PageTitle';

let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        path: '/',
        Component: PageTitle(Home, 'Home | Circle'),
      },
      {
        path: '/profile',
        Component: PageTitle(Profile, 'Profile | Circle'),
      },
      {
        path: '/follow',
        Component: PageTitle(Follow, 'Followers | Circle'),
      },
      {
        path: '/following',
        Component: PageTitle(Following, 'Following | Circle'),
      },
      {
        path: '/home',
        Component: PageTitle(Home, 'Home | Circle'),
      },
      {
        path: '/profilemedia',
        Component: PageTitle(ProfileMedia, 'Profile | Circle'),
      },
      {
        path: '/search',
        Component: PageTitle(Search, 'Search | Circle'),
      },
    ],
  },
  {
    path: '/register',
    Component: PageTitle(Register, 'Register | Circle'),
  },
  {
    path: '/login',
    Component: PageTitle(Login, 'Login | Circle'),
  },
  {
    path: '/forgot',
    Component: PageTitle(ForgotPassword, 'Forgot Password | Circle'),
  },
  {
    path: '/reset',
    Component: PageTitle(ResetPassword, 'Reset Password | Circle'),
  },
  {
    path: '/page',
    Component: PageTitle(Page, 'Page | Circle'),
  },
  {
    path: '/media',
    element: (() => {
      const MediaWithTitle = PageTitle(PageMedia, 'Media | Cirlce');
      return <MediaWithTitle image="splash.jpg" />;
    })(),
  },
  // {
  //   path: '/',
  //   Component: Home,
  // },
  // {
  //   path: '/home',
  //   Component: Home,
  // },
  // {
  //   path: '/profile',
  //   Component: Profile,
  // },
  // {
  //   path: '/follow',
  //   Component: Follow,
  // },
  // {
  //   path: '/following',
  //   Component: Following,
  // },
  {
    path: '/myform',
    Component: LoginForm,
  },
]);

export default router;
