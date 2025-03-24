import { createBrowserRouter } from 'react-router-dom';
import Register from './auth/Register';
import Home from './Home';
import Page from './Page';
import Login from './auth/Login';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';

let router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
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
    path: '/home',
    Component: Home,
  },
  {
    path: '/page',
    Component: Page,
  },
]);

export default router;
