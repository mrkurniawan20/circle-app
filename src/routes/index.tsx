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

let router = createBrowserRouter([
  {
    Component: ProtectedRouteLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/profile',
        Component: Profile,
      },
      {
        path: '/follow',
        Component: Follow,
      },
      {
        path: '/following',
        Component: Following,
      },
      {
        path: '/home',
        Component: Home,
      },
    ],
  },
  // {
  //   path: '/',
  //   Component: Home,
  // },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgot',
    Component: ForgotPassword,
  },
  {
    path: '/reset',
    Component: ResetPassword,
  },
  {
    path: '/page',
    Component: Page,
  },
  {
    path: '/pagemedia',
    Component: PageMedia,
  },
  // {
  //   path: '/home',
  //   Component: Home,
  // },
  // {
  //   path: '/profile',
  //   Component: Profile,
  // },
  {
    path: '/profile/media',
    Component: ProfileMedia,
  },
  {
    path: '/search',
    Component: Search,
  },
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
