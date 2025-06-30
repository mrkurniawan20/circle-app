import { createBrowserRouter } from 'react-router-dom';
import Register from './auth/Register';
import { LoginForm } from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
// import Login from './auth/DeprecatedLogin';
import Home from './Home';
import Page from './Page';
import Search from './Search';
import Following from './Following';
import ProtectedRouteLayout from './ProtectedRoute';
// import LoginForm from '@/components/auth/MyForm';
import PageTitle from '@/layouts/components/PageTitle';
import Followers from './Followers';
import LoadingPage from '@/layouts/components/LoadingPage';
import ProfileUsername from './ProfileUsername';
import ProfileMediaUsername from './ProfileMediaUsername';

let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      // {
      //   path: '',
      //   Component: PageTitle(Home, 'Home | Circle'),
      // },
      // {
      //   path: '/profile',
      //   Component: PageTitle(Profile, 'Profile | Circle'),
      // },
      {
        path: '/followers',
        Component: PageTitle(Followers, 'Followers | Circle'),
      },
      {
        path: '/follow',
        Component: PageTitle(Following, 'Following | Circle'),
      },
      {
        path: '/home',
        Component: PageTitle(Home, 'Home | Circle'),
      },
      // {
      //   path: '/profilemedia',
      //   Component: PageTitle(ProfileMedia, 'Profile | Circle'),
      // },
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
  {
    path: '/page/:id',
    Component: PageTitle(Page, 'Page | Circle'),
  },
  // {
  //   path: '/media',
  //   Component: PageTitle(PageMedia, 'Media | Circle'),
  // },
  // {
  //   path: '/',
  //   Component: Home,
  // },
  // {
  //   path: '/home',
  //   Component: Home,
  // },
  {
    path: '/profile/:username',
    Component: ProfileUsername,
  },
  {
    path: '/media/:username',
    Component: PageTitle(ProfileMediaUsername, 'Profile | Circle'),
  },
  // {
  //   path: '/following',
  //   Component: Following,
  // },
  {
    path: '/loading',
    Component: LoadingPage,
  },
]);

export default router;
