import { createBrowserRouter } from 'react-router-dom';
import Register from './auth/Register';
import Home from './Home';
import Login from './auth/Login';

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
]);

export default router;
